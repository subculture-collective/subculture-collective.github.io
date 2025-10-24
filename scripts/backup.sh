#!/bin/bash

# Backup Script for SubCult.TV VPS Deployment
# This script creates backups of the deployed application and configuration files

set -e  # Exit on error

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
APP_PATH="${APP_PATH:-/var/www/subcult}"
BACKUP_PATH="${BACKUP_PATH:-$APP_PATH/backups}"
NGINX_CONFIG="${NGINX_CONFIG:-/etc/nginx/sites-available/subcult}"
SSL_PATH="${SSL_PATH:-/etc/letsencrypt}"
RETENTION_DAYS="${RETENTION_DAYS:-7}"
RETENTION_WEEKS="${RETENTION_WEEKS:-4}"
FULL_BACKUP="${1:-}"

# Backup metadata
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
DATE_TAG=$(date +%Y%m%d)
DAY_OF_WEEK=$(date +%u)  # 1-7 (Monday is 1, Sunday is 7)

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
    echo "║    SubCult.TV Backup Script           ║"
    echo "╚═══════════════════════════════════════╝"
    echo ""
}

# Check if running with appropriate permissions
check_permissions() {
    print_info "Checking permissions..."
    
    if [ ! -w "$BACKUP_PATH" ]; then
        print_error "No write permission to backup directory: $BACKUP_PATH"
        exit 1
    fi
    
    print_success "Permissions OK"
}

# Create backup directories
create_backup_dirs() {
    print_info "Creating backup directories..."
    
    mkdir -p "$BACKUP_PATH/daily"
    mkdir -p "$BACKUP_PATH/weekly"
    mkdir -p "$BACKUP_PATH/config"
    
    print_success "Backup directories ready"
}

# Backup application files
backup_application() {
    print_info "Backing up application files..."
    
    local backup_file="app-$TIMESTAMP.tar.gz"
    local backup_type="daily"
    
    # Use weekly backup on Sunday
    if [ "$DAY_OF_WEEK" -eq 7 ] || [ "$FULL_BACKUP" == "--full" ]; then
        backup_type="weekly"
        backup_file="app-weekly-$DATE_TAG.tar.gz"
    fi
    
    local backup_dest="$BACKUP_PATH/$backup_type/$backup_file"
    
    if [ -d "$APP_PATH/dist" ]; then
        tar -czf "$backup_dest" -C "$APP_PATH" dist/ 2>/dev/null
        
        local size=$(du -h "$backup_dest" | cut -f1)
        print_success "Application backed up: $backup_file ($size)"
    else
        print_warning "Application directory not found: $APP_PATH/dist"
    fi
}

# Backup Nginx configuration
backup_nginx_config() {
    print_info "Backing up Nginx configuration..."
    
    local config_backup="$BACKUP_PATH/config/nginx-config-$DATE_TAG.conf"
    
    if [ -f "$NGINX_CONFIG" ]; then
        if sudo cp "$NGINX_CONFIG" "$config_backup" 2>/dev/null; then
            print_success "Nginx config backed up: nginx-config-$DATE_TAG.conf"
        else
            print_warning "Could not backup Nginx config (may need sudo)"
        fi
    else
        print_warning "Nginx config not found: $NGINX_CONFIG"
    fi
}

# Backup SSL certificates
backup_ssl_certificates() {
    print_info "Backing up SSL certificates..."
    
    local ssl_backup="$BACKUP_PATH/config/ssl-$DATE_TAG.tar.gz"
    
    if [ -d "$SSL_PATH" ]; then
        if sudo tar -czf "$ssl_backup" -C / "etc/letsencrypt" 2>/dev/null; then
            sudo chown $(whoami):$(whoami) "$ssl_backup"
            local size=$(du -h "$ssl_backup" | cut -f1)
            print_success "SSL certificates backed up: ssl-$DATE_TAG.tar.gz ($size)"
        else
            print_warning "Could not backup SSL certificates (may need sudo)"
        fi
    else
        print_warning "SSL directory not found: $SSL_PATH"
    fi
}

# Create backup manifest
create_manifest() {
    print_info "Creating backup manifest..."
    
    local manifest_file="$BACKUP_PATH/manifest-$DATE_TAG.txt"
    
    cat > "$manifest_file" << EOF
SubCult.TV Backup Manifest
Created: $(date)
Hostname: $(hostname)
User: $(whoami)

Backup Contents:
EOF
    
    # List daily backups
    echo "" >> "$manifest_file"
    echo "Daily Backups:" >> "$manifest_file"
    ls -lh "$BACKUP_PATH/daily/" >> "$manifest_file" 2>/dev/null || echo "  None" >> "$manifest_file"
    
    # List weekly backups
    echo "" >> "$manifest_file"
    echo "Weekly Backups:" >> "$manifest_file"
    ls -lh "$BACKUP_PATH/weekly/" >> "$manifest_file" 2>/dev/null || echo "  None" >> "$manifest_file"
    
    # List config backups
    echo "" >> "$manifest_file"
    echo "Config Backups:" >> "$manifest_file"
    ls -lh "$BACKUP_PATH/config/" >> "$manifest_file" 2>/dev/null || echo "  None" >> "$manifest_file"
    
    print_success "Manifest created: manifest-$DATE_TAG.txt"
}

# Clean old backups
cleanup_old_backups() {
    print_info "Cleaning up old backups..."
    
    local removed_count=0
    
    # Clean daily backups older than RETENTION_DAYS
    if [ -d "$BACKUP_PATH/daily" ]; then
        while IFS= read -r -d '' file; do
            rm -f "$file"
            ((removed_count++))
        done < <(find "$BACKUP_PATH/daily" -name "app-*.tar.gz" -type f -mtime +$RETENTION_DAYS -print0 2>/dev/null)
    fi
    
    # Clean weekly backups older than RETENTION_WEEKS
    local retention_weeks_days=$((RETENTION_WEEKS * 7))
    if [ -d "$BACKUP_PATH/weekly" ]; then
        while IFS= read -r -d '' file; do
            rm -f "$file"
            ((removed_count++))
        done < <(find "$BACKUP_PATH/weekly" -name "app-*.tar.gz" -type f -mtime +$retention_weeks_days -print0 2>/dev/null)
    fi
    
    # Clean old config backups (keep last 30 days)
    if [ -d "$BACKUP_PATH/config" ]; then
        while IFS= read -r -d '' file; do
            rm -f "$file"
            ((removed_count++))
        done < <(find "$BACKUP_PATH/config" -type f -mtime +30 -print0 2>/dev/null)
    fi
    
    # Clean old manifests (keep last 30 days)
    while IFS= read -r -d '' file; do
        rm -f "$file"
        ((removed_count++))
    done < <(find "$BACKUP_PATH" -name "manifest-*.txt" -type f -mtime +30 -print0 2>/dev/null)
    
    if [ $removed_count -gt 0 ]; then
        print_success "Removed $removed_count old backup(s)"
    else
        print_info "No old backups to remove"
    fi
}

# Calculate total backup size
calculate_backup_size() {
    print_info "Calculating backup size..."
    
    local total_size=$(du -sh "$BACKUP_PATH" 2>/dev/null | cut -f1)
    print_info "Total backup size: $total_size"
    
    # Count backups
    local daily_count=$(find "$BACKUP_PATH/daily" -name "app-*.tar.gz" -type f 2>/dev/null | wc -l)
    local weekly_count=$(find "$BACKUP_PATH/weekly" -name "app-*.tar.gz" -type f 2>/dev/null | wc -l)
    
    print_info "Daily backups: $daily_count"
    print_info "Weekly backups: $weekly_count"
}

# Verify backup integrity
verify_backup() {
    print_info "Verifying latest backup..."
    
    # Find the most recent backup
    local latest_backup=$(find "$BACKUP_PATH/daily" "$BACKUP_PATH/weekly" -name "app-*.tar.gz" -type f 2>/dev/null | sort -r | head -n 1)
    
    if [ -z "$latest_backup" ]; then
        print_warning "No backup found to verify"
        return
    fi
    
    # Test if tar file is valid
    if tar -tzf "$latest_backup" > /dev/null 2>&1; then
        print_success "Backup integrity verified: $(basename "$latest_backup")"
    else
        print_error "Backup integrity check failed: $(basename "$latest_backup")"
        exit 1
    fi
}

# Print backup summary
print_summary() {
    echo ""
    echo "╔═══════════════════════════════════════╗"
    echo "║        Backup Summary                 ║"
    echo "╚═══════════════════════════════════════╝"
    echo ""
    print_success "Backup completed successfully"
    print_info "Backup location: $BACKUP_PATH"
    calculate_backup_size
    echo ""
}

# Main backup function
main() {
    print_banner
    
    check_permissions
    create_backup_dirs
    
    backup_application
    backup_nginx_config
    backup_ssl_certificates
    
    create_manifest
    verify_backup
    cleanup_old_backups
    
    print_summary
}

# Handle script arguments
case "$1" in
    --help|-h)
        echo "Usage: $0 [OPTIONS]"
        echo ""
        echo "Options:"
        echo "  --help, -h          Show this help message"
        echo "  --full              Create a full backup (weekly)"
        echo "  --restore           Restore from backup (interactive)"
        echo ""
        echo "Environment Variables:"
        echo "  APP_PATH            Application path (default: /var/www/subcult)"
        echo "  BACKUP_PATH         Backup directory (default: \$APP_PATH/backups)"
        echo "  NGINX_CONFIG        Nginx config path (default: /etc/nginx/sites-available/subcult)"
        echo "  SSL_PATH            SSL certificates path (default: /etc/letsencrypt)"
        echo "  RETENTION_DAYS      Daily backup retention (default: 7)"
        echo "  RETENTION_WEEKS     Weekly backup retention (default: 4)"
        echo ""
        echo "Examples:"
        echo "  $0                  # Create daily backup"
        echo "  $0 --full           # Create full backup"
        echo "  $0 --restore        # Restore from backup"
        exit 0
        ;;
    --restore)
        print_banner
        print_info "Available backups:"
        echo ""
        
        # List available backups
        find "$BACKUP_PATH/daily" "$BACKUP_PATH/weekly" -name "app-*.tar.gz" -type f 2>/dev/null | \
            sort -r | \
            nl -w2 -s'. '
        
        echo ""
        read -p "Enter backup number to restore (or 'q' to quit): " backup_num
        
        if [ "$backup_num" == "q" ]; then
            print_info "Restore cancelled"
            exit 0
        fi
        
        backup_file=$(find "$BACKUP_PATH/daily" "$BACKUP_PATH/weekly" -name "app-*.tar.gz" -type f 2>/dev/null | \
            sort -r | \
            sed -n "${backup_num}p")
        
        if [ -z "$backup_file" ]; then
            print_error "Invalid backup number"
            exit 1
        fi
        
        print_warning "This will restore: $(basename "$backup_file")"
        read -p "Are you sure? (yes/no): " confirm
        
        if [ "$confirm" != "yes" ]; then
            print_info "Restore cancelled"
            exit 0
        fi
        
        print_info "Restoring backup..."
        
        # Stop Nginx
        sudo systemctl stop nginx
        
        # Backup current state
        if [ -d "$APP_PATH/dist" ]; then
            mv "$APP_PATH/dist" "$APP_PATH/dist.pre-restore-$TIMESTAMP"
        fi
        
        # Extract backup
        tar -xzf "$backup_file" -C "$APP_PATH"
        
        # Start Nginx
        sudo systemctl start nginx
        
        print_success "Restore completed"
        print_info "Previous state saved to: dist.pre-restore-$TIMESTAMP"
        exit 0
        ;;
    --full)
        FULL_BACKUP="--full"
        main
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
