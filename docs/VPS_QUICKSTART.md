# VPS Deployment Quick Start Guide

This is a condensed guide for quickly setting up and deploying SubCult.TV to a VPS. For comprehensive details, see [VPS_DEPLOYMENT.md](./VPS_DEPLOYMENT.md).

## Prerequisites

- Ubuntu 22.04 LTS VPS
- Domain name with DNS access
- SSH key pair
- GitHub repository access

## Quick Setup (30 minutes)

### 1. Initial Server Setup (5 minutes)

```bash
# SSH into your VPS
ssh root@your-vps-ip

# Update system
apt update && apt upgrade -y

# Install required software
apt install -y curl wget git nginx certbot python3-certbot-nginx ufw

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Create deployment user
adduser deploy
usermod -aG sudo deploy

# Setup firewall
ufw allow 22
ufw allow 80
ufw allow 443
ufw enable
```

### 2. Configure Deployment User (3 minutes)

```bash
# Switch to deploy user
su - deploy

# Add your SSH key
mkdir -p ~/.ssh
nano ~/.ssh/authorized_keys  # Paste your public key
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys

# Create app directory
sudo mkdir -p /var/www/subcult
sudo chown -R deploy:deploy /var/www/subcult
```

### 3. Configure DNS (2 minutes + propagation time)

Add A record for your domain:

- Type: A
- Name: @ (or subdomain)
- Value: Your VPS IP
- TTL: 3600

Wait for DNS propagation (1-48 hours, usually < 1 hour).

### 4. Setup SSL Certificate (3 minutes)

```bash
# Obtain SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Test renewal
sudo certbot renew --dry-run
```

### 5. Configure Nginx (5 minutes)

```bash
# Copy nginx.conf from repo to server
scp nginx.conf deploy@your-vps:/tmp/

# SSH into server
ssh deploy@your-vps

# Move config to Nginx directory
sudo cp /tmp/nginx.conf /etc/nginx/sites-available/subcult

# Edit config to update domain name
sudo nano /etc/nginx/sites-available/subcult
# Replace 'subcult.example.com' with your actual domain

# Enable site
sudo ln -s /etc/nginx/sites-available/subcult /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default

# Test and reload
sudo nginx -t
sudo systemctl reload nginx
```

### 6. Deploy Application (5 minutes)

**Option A: Manual Deployment**

```bash
# On your local machine
cd /path/to/subculture-collective.github.io

# Set environment variables
export VPS_HOST=yourdomain.com
export VPS_USER=deploy
export VPS_PATH=/var/www/subcult
export HEALTH_CHECK_URL=https://yourdomain.com

# Deploy
./deploy-vps.sh
```

**Option B: GitHub Actions (Recommended)**

1. Go to repository Settings → Secrets and Variables → Actions
2. Add Repository Secrets:
   - `VPS_HOST`: your-vps-ip or yourdomain.com
   - `VPS_USER`: deploy
   - `VPS_SSH_KEY`: Your private SSH key content
   - `VPS_PATH`: /var/www/subcult
   - `VPS_PORT`: 22 (optional)

3. Add Repository Variables:
   - `VPS_DEPLOYMENT_ENABLED`: true
   - `VPS_HEALTH_CHECK_URL`: https://yourdomain.com

4. Push to main branch or manually trigger workflow

### 7. Setup Automated Backups (5 minutes)

```bash
# SSH into VPS
ssh deploy@your-vps

# Copy backup script
cd /var/www/subcult
# Copy scripts/backup.sh from repo

# Make executable
chmod +x scripts/backup.sh

# Test backup
./scripts/backup.sh

# Schedule automatic backups
crontab -e

# Add these lines:
# Daily backup at 2 AM
0 2 * * * /var/www/subcult/scripts/backup.sh >> /var/log/subcult/backup.log 2>&1

# Weekly full backup on Sunday at 3 AM
0 3 * * 0 /var/www/subcult/scripts/backup.sh --full >> /var/log/subcult/backup.log 2>&1
```

### 8. Verify Deployment (2 minutes)

```bash
# Check if site is accessible
curl -I https://yourdomain.com

# Check Nginx status
sudo systemctl status nginx

# Check logs
sudo tail -f /var/log/nginx/subcult.access.log
```

## Quick Troubleshooting

### Site not accessible

```bash
# Check Nginx
sudo systemctl status nginx
sudo nginx -t

# Check logs
sudo tail -n 50 /var/log/nginx/subcult.error.log

# Verify files exist
ls -la /var/www/subcult/dist/
```

### SSL issues

```bash
# Check certificate
sudo certbot certificates

# Renew certificate
sudo certbot renew
```

### Permission errors

```bash
# Fix permissions
sudo chown -R deploy:deploy /var/www/subcult
sudo find /var/www/subcult/dist -type d -exec chmod 755 {} \;
sudo find /var/www/subcult/dist -type f -exec chmod 644 {} \;
```

### Deployment fails

```bash
# Check SSH connection
ssh deploy@your-vps

# Check disk space
df -h

# Check server resources
htop
```

## Quick Commands Reference

```bash
# Reload Nginx
sudo systemctl reload nginx

# Restart Nginx
sudo systemctl restart nginx

# View error logs
sudo tail -f /var/log/nginx/subcult.error.log

# View access logs
sudo tail -f /var/log/nginx/subcult.access.log

# Manual deployment
./deploy-vps.sh

# Create backup
./scripts/backup.sh

# Rollback deployment
./deploy-vps.sh --rollback

# Check SSL certificate expiry
sudo certbot certificates

# Renew SSL certificate
sudo certbot renew
```

## Environment Variables for Deployment

Set these before running `deploy-vps.sh`:

```bash
export VPS_HOST=yourdomain.com           # Required
export VPS_USER=deploy                   # Default: deploy
export VPS_PATH=/var/www/subcult         # Default: /var/www/subcult
export VPS_PORT=22                       # Default: 22
export HEALTH_CHECK_URL=https://yourdomain.com  # Optional but recommended
export BACKUP_ENABLED=true               # Default: true
export RUN_TESTS=true                    # Default: true
```

## Next Steps

After successful deployment:

1. ✅ Set up monitoring (UptimeRobot, Pingdom, etc.)
2. ✅ Configure alerts for downtime
3. ✅ Test backup restoration
4. ✅ Document your specific setup
5. ✅ Schedule regular security updates
6. ✅ Run security audit (SSL Labs, SecurityHeaders.com)
7. ✅ Test disaster recovery procedure

## Additional Resources

- **Full Documentation**: [VPS_DEPLOYMENT.md](./VPS_DEPLOYMENT.md)
- **Setup Checklist**: [VPS_SETUP_CHECKLIST.md](./VPS_SETUP_CHECKLIST.md)
- **Main Deployment Guide**: [../DEPLOYMENT.md](../DEPLOYMENT.md)
- **Nginx Configuration**: `nginx.conf` in repository root
- **Deployment Script**: `deploy-vps.sh` in repository root
- **Backup Script**: `scripts/backup.sh`

## Need Help?

- Check the [full VPS deployment guide](./VPS_DEPLOYMENT.md)
- Review [troubleshooting section](./VPS_DEPLOYMENT.md#troubleshooting)
- Check GitHub Actions logs for CI/CD issues
- Review Nginx error logs for server issues

## Security Reminders

- ✅ Keep SSH keys secure and never commit them
- ✅ Use strong passwords for the deploy user
- ✅ Enable firewall (UFW)
- ✅ Keep system packages updated
- ✅ Monitor logs regularly
- ✅ Use HTTPS only (enforce SSL)
- ✅ Regular security audits
- ✅ Backup encryption for sensitive data
