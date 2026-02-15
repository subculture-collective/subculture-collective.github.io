#!/bin/bash

# VPS Deployment Script for SubCult.TV
# This script builds and deploys the application to a VPS via SSH

set -e  # Exit on error

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration (update these values)
VPS_HOST="${VPS_HOST:-}"
VPS_USER="${VPS_USER:-deploy}"
VPS_PATH="${VPS_PATH:-/var/www/subcult}"
VPS_PORT="${VPS_PORT:-22}"
BACKUP_ENABLED="${BACKUP_ENABLED:-true}"
RUN_TESTS="${RUN_TESTS:-true}"
HEALTH_CHECK_URL="${HEALTH_CHECK_URL:-}"

# Print colored output
print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Print banner
print_banner() {
    echo ""
    echo "╔═══════════════════════════════════════╗"
    echo "║   SubCult.TV VPS Deployment Script   ║"
    echo "╚═══════════════════════════════════════╝"
    echo ""
}

# Check if required commands exist
check_dependencies() {
    print_info "Checking dependencies..."
    
    local deps=("node" "npm" "rsync" "ssh")
    for dep in "${deps[@]}"; do
        if ! command -v "$dep" &> /dev/null; then
            print_error "$dep is not installed"
            exit 1
        fi
    done
    
    print_success "All dependencies are installed"
}

# Validate configuration
validate_config() {
    print_info "Validating configuration..."
    
    if [ -z "$VPS_HOST" ]; then
        print_error "VPS_HOST is not set"
        print_info "Set it via environment variable or update the script"
        exit 1
    fi
    
    if [ -z "$VPS_USER" ]; then
        print_error "VPS_USER is not set"
        exit 1
    fi
    
    if [ -z "$VPS_PATH" ]; then
        print_error "VPS_PATH is not set"
        exit 1
    fi
    
    print_success "Configuration is valid"
    print_info "  Host: $VPS_USER@$VPS_HOST:$VPS_PORT"
    print_info "  Path: $VPS_PATH"
}

# Test SSH connection
test_ssh_connection() {
    print_info "Testing SSH connection..."
    
    if ! ssh -p "$VPS_PORT" -o ConnectTimeout=10 -o BatchMode=yes "$VPS_USER@$VPS_HOST" exit 2>/dev/null; then
        print_error "Cannot connect to VPS via SSH"
        print_info "Make sure SSH keys are configured and the VPS is accessible"
        exit 1
    fi
    
    print_success "SSH connection successful"
}

# Run linting
run_lint() {
    print_info "Running linter..."
    
    if npm run lint:ci; then
        print_success "Linting passed"
    else
        print_error "Linting failed"
        exit 1
    fi
}

# Run tests
run_tests() {
    if [ "$RUN_TESTS" != "true" ]; then
        print_warning "Skipping tests (RUN_TESTS=false)"
        return
    fi
    
    print_info "Running tests..."
    
    if npm run test:run; then
        print_success "Tests passed"
    else
        print_error "Tests failed"
        exit 1
    fi
}

# Build the application
build_app() {
    print_info "Building production bundle..."
    
    # Clean previous build
    if [ -d "dist" ]; then
        rm -rf dist
    fi
    
    # Build
    if npm run build; then
        print_success "Build completed"
    else
        print_error "Build failed"
        exit 1
    fi
    
    # Verify build output
    if [ ! -d "dist" ] || [ ! -f "dist/index.html" ]; then
        print_error "Build output is invalid"
        exit 1
    fi
    
    # Show build size
    local build_size=$(du -sh dist | cut -f1)
    print_info "Build size: $build_size"
}

# Create backup on VPS
create_backup() {
    if [ "$BACKUP_ENABLED" != "true" ]; then
        print_warning "Skipping backup (BACKUP_ENABLED=false)"
        return
    fi
    
    print_info "Creating backup on VPS..."
    
    local backup_name="backup-$(date +%Y%m%d-%H%M%S)"
    local backup_path="$VPS_PATH/backups/$backup_name"
    
    ssh -p "$VPS_PORT" "$VPS_USER@$VPS_HOST" bash << EOF
        # Create backup directory if it doesn't exist
        mkdir -p "$VPS_PATH/backups"
        
        # Check if dist directory exists
        if [ -d "$VPS_PATH/dist" ]; then
            # Create backup
            cp -r "$VPS_PATH/dist" "$backup_path"
            echo "Backup created: $backup_path"
            
            # Keep only last 7 backups
            cd "$VPS_PATH/backups"
            ls -t | tail -n +8 | xargs -r rm -rf
            echo "Old backups cleaned up"
        else
            echo "No existing deployment to backup"
        fi
EOF
    
    print_success "Backup completed"
}

# Deploy to VPS
deploy_to_vps() {
    print_info "Deploying to VPS..."
    
    # Ensure target directory exists
    ssh -p "$VPS_PORT" "$VPS_USER@$VPS_HOST" "mkdir -p $VPS_PATH/dist"
    
    # Sync files
    print_info "Syncing files..."
    if rsync -avz --delete \
        -e "ssh -p $VPS_PORT" \
        --progress \
        --exclude='.git' \
        --exclude='node_modules' \
        --exclude='.env*' \
        ./dist/ \
        "$VPS_USER@$VPS_HOST:$VPS_PATH/dist/"; then
        print_success "Files synced successfully"
    else
        print_error "File sync failed"
        exit 1
    fi
}

# Set correct permissions
set_permissions() {
    print_info "Setting file permissions..."
    
    ssh -p "$VPS_PORT" "$VPS_USER@$VPS_HOST" bash << EOF
        # Set directory permissions
        find "$VPS_PATH/dist" -type d -exec chmod 755 {} \;
        
        # Set file permissions
        find "$VPS_PATH/dist" -type f -exec chmod 644 {} \;
        
        echo "Permissions updated"
EOF
    
    print_success "Permissions set correctly"
}

# Reload Nginx
reload_nginx() {
    print_info "Reloading Nginx..."
    
    if ssh -p "$VPS_PORT" "$VPS_USER@$VPS_HOST" "sudo nginx -t && sudo systemctl reload nginx"; then
        print_success "Nginx reloaded successfully"
    else
        print_warning "Failed to reload Nginx (may require manual intervention)"
        print_info "Run: sudo systemctl reload nginx"
    fi
}

# Health check
health_check() {
    if [ -z "$HEALTH_CHECK_URL" ]; then
        print_warning "Skipping health check (HEALTH_CHECK_URL not set)"
        return
    fi
    
    print_info "Running health check..."
    
    sleep 5  # Wait for server to stabilize
    
    local max_attempts=5
    local attempt=1
    
    while [ $attempt -le $max_attempts ]; do
        print_info "Health check attempt $attempt/$max_attempts..."
        
        if curl -f -s -o /dev/null "$HEALTH_CHECK_URL"; then
            print_success "Health check passed"
            return 0
        fi
        
        if [ $attempt -lt $max_attempts ]; then
            print_warning "Health check failed, retrying in 5 seconds..."
            sleep 5
        fi
        
        attempt=$((attempt + 1))
    done
    
    print_error "Health check failed after $max_attempts attempts"
    return 1
}

# Rollback deployment
rollback() {
    print_warning "Rolling back deployment..."
    
    ssh -p "$VPS_PORT" "$VPS_USER@$VPS_HOST" bash << 'EOF'
        BACKUP_PATH="/var/www/subcult/backups"
        DIST_PATH="/var/www/subcult/dist"
        
        # Find the most recent backup
        LATEST_BACKUP=$(ls -t "$BACKUP_PATH" | head -n 1)
        
        if [ -z "$LATEST_BACKUP" ]; then
            echo "No backup found for rollback"
            exit 1
        fi
        
        echo "Rolling back to: $LATEST_BACKUP"
        
        # Remove current deployment
        rm -rf "$DIST_PATH"
        
        # Restore from backup
        cp -r "$BACKUP_PATH/$LATEST_BACKUP" "$DIST_PATH"
        
        # Reload Nginx
        sudo systemctl reload nginx
        
        echo "Rollback completed"
EOF
    
    if [ $? -eq 0 ]; then
        print_success "Rollback completed successfully"
    else
        print_error "Rollback failed"
        exit 1
    fi
}

# Print deployment summary
print_summary() {
    local end_time=$(date +%s)
    local duration=$((end_time - start_time))
    
    echo ""
    echo "╔═══════════════════════════════════════╗"
    echo "║       Deployment Summary              ║"
    echo "╚═══════════════════════════════════════╝"
    echo ""
    print_info "Deployment completed in ${duration}s"
    print_info "Deployed to: $VPS_USER@$VPS_HOST:$VPS_PATH"
    
    if [ -n "$HEALTH_CHECK_URL" ]; then
        print_info "Site URL: $HEALTH_CHECK_URL"
    fi
    
    echo ""
}

# Main deployment function
main() {
    local start_time=$(date +%s)
    
    print_banner
    
    # Pre-deployment checks
    check_dependencies
    validate_config
    test_ssh_connection
    
    # Build and test
    run_lint
    run_tests
    build_app
    
    # Deployment
    create_backup
    deploy_to_vps
    set_permissions
    reload_nginx
    
    # Post-deployment
    if health_check; then
        print_summary
        exit 0
    else
        print_error "Deployment health check failed"
        read -p "Do you want to rollback? (y/N) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            rollback
        fi
        exit 1
    fi
}

# Handle script arguments
case "${1:-}" in
    --help|-h)
        echo "Usage: $0 [OPTIONS]"
        echo ""
        echo "Options:"
        echo "  --help, -h          Show this help message"
        echo "  --no-tests          Skip running tests"
        echo "  --no-backup         Skip creating backup"
        echo "  --rollback          Rollback to previous deployment"
        echo ""
        echo "Environment Variables:"
        echo "  VPS_HOST            VPS hostname or IP (required)"
        echo "  VPS_USER            SSH user (default: deploy)"
        echo "  VPS_PATH            Deployment path (default: /var/www/subcult)"
        echo "  VPS_PORT            SSH port (default: 22)"
        echo "  BACKUP_ENABLED      Create backup before deploy (default: true)"
        echo "  RUN_TESTS           Run tests before deploy (default: true)"
        echo "  HEALTH_CHECK_URL    URL to check after deployment"
        echo ""
        echo "Example:"
        echo "  VPS_HOST=example.com HEALTH_CHECK_URL=https://example.com $0"
        exit 0
        ;;
    --no-tests)
        RUN_TESTS=false
        main
        ;;
    --no-backup)
        BACKUP_ENABLED=false
        main
        ;;
    --rollback)
        print_banner
        validate_config
        test_ssh_connection
        rollback
        exit 0
        ;;
    "")
        main
        ;;
    *)
        print_error "Unknown option: $1"
        echo "Use --help for usage information"
        exit 1
        ;;
esac
