# VPS Deployment Guide

## Overview

This guide provides comprehensive instructions for deploying the SubCult.TV site to a Virtual Private Server (VPS) as an alternative to GitHub Pages. This setup offers greater control, flexibility, and customization options.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Server Setup](#server-setup)
- [Domain Configuration](#domain-configuration)
- [SSL Certificate Setup](#ssl-certificate-setup)
- [Nginx Configuration](#nginx-configuration)
- [Deployment Process](#deployment-process)
- [Environment Variables](#environment-variables)
- [Monitoring & Logs](#monitoring--logs)
- [Backup Strategy](#backup-strategy)
- [Security Considerations](#security-considerations)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Server Requirements

**Minimum Specifications:**

- **OS**: Ubuntu 22.04 LTS or Debian 12
- **RAM**: 2GB (4GB recommended)
- **Storage**: 20GB SSD
- **CPU**: 1 vCPU (2 vCPU recommended)
- **Network**: 1Gbps port speed

**Software Requirements:**

- Node.js 20.x LTS
- npm 10.x
- Nginx 1.24+
- Git 2.x
- Certbot (for SSL)
- UFW or iptables (firewall)

### Local Requirements

- SSH access to the VPS
- Git repository access
- SSH key pair for authentication

---

## Server Setup

### 1. Initial Server Configuration

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install essential tools
sudo apt install -y curl wget git build-essential
```

### 2. Install Node.js

```bash
# Install Node.js 20.x LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version  # Should be v20.x.x
npm --version   # Should be v10.x.x
```

### 3. Install Nginx

```bash
# Install Nginx
sudo apt install -y nginx

# Verify installation
nginx -v

# Enable and start Nginx
sudo systemctl enable nginx
sudo systemctl start nginx
sudo systemctl status nginx
```

### 4. Create Deployment User

```bash
# Create a dedicated deployment user
sudo adduser deploy
sudo usermod -aG sudo deploy

# Add SSH key for the deploy user
sudo su - deploy
mkdir -p ~/.ssh
chmod 700 ~/.ssh
nano ~/.ssh/authorized_keys  # Paste your public SSH key
chmod 600 ~/.ssh/authorized_keys
exit
```

### 5. Create Application Directory

```bash
# Create application directory
sudo mkdir -p /var/www/subcult
sudo chown -R deploy:deploy /var/www/subcult

# Create logs directory
sudo mkdir -p /var/log/subcult
sudo chown -R deploy:deploy /var/log/subcult
```

---

## Domain Configuration

### DNS Settings

Configure your domain's DNS records to point to your VPS:

**A Record:**

```
Type: A
Name: @
Value: [Your VPS IP Address]
TTL: 3600
```

**www Subdomain (Optional):**

```
Type: A
Name: www
Value: [Your VPS IP Address]
TTL: 3600
```

**Verification:**

```bash
# Wait for DNS propagation (can take up to 48 hours)
dig yourdomain.com
nslookup yourdomain.com
```

---

## SSL Certificate Setup

### Using Let's Encrypt (Recommended)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain SSL certificate (replace with your domain)
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Test automatic renewal
sudo certbot renew --dry-run
```

The certificate will be automatically renewed by Certbot's systemd timer.

### Manual SSL Certificate

If you have your own SSL certificate:

```bash
# Copy certificate files to server
sudo mkdir -p /etc/ssl/private
sudo chmod 700 /etc/ssl/private

# Upload your certificate files
sudo cp your-cert.crt /etc/ssl/certs/
sudo cp your-key.key /etc/ssl/private/
sudo chmod 600 /etc/ssl/private/your-key.key
```

---

## Nginx Configuration

### Create Nginx Configuration File

```bash
# Create configuration file
sudo nano /etc/nginx/sites-available/subcult
```

See the `nginx.conf` file in the repository root for the complete configuration template.

### Enable the Site

```bash
# Create symbolic link to enable site
sudo ln -s /etc/nginx/sites-available/subcult /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### Configuration Features

The Nginx configuration includes:

- **SPA Routing**: All routes fallback to `index.html` for client-side routing
- **Gzip Compression**: Reduces bandwidth usage (text files compressed)
- **Brotli Compression**: Better compression for supported browsers
- **Caching Headers**: Optimizes repeat visits
- **Security Headers**: Protects against common web vulnerabilities
- **SSL/TLS**: Enforces HTTPS with strong ciphers
- **Rate Limiting**: Prevents abuse and DDoS attacks
- **Static Asset Optimization**: Serves pre-compressed assets when available

---

## Deployment Process

### Manual Deployment

1. **Build locally:**

   ```bash
   npm run build
   ```

2. **Upload to server:**

   ```bash
   rsync -avz --delete ./dist/ deploy@your-server:/var/www/subcult/dist/
   ```

3. **Verify deployment:**
   ```bash
   curl -I https://yourdomain.com
   ```

### Automated Deployment Script

Use the provided `deploy-vps.sh` script:

```bash
# Make script executable
chmod +x deploy-vps.sh

# Run deployment
./deploy-vps.sh
```

The script will:

- Build the production bundle
- Run tests and linting
- Deploy via SSH
- Verify the deployment
- Rollback on failure

### GitHub Actions Deployment

Configure the VPS deployment workflow in `.github/workflows/deploy-vps.yml`.

**Required GitHub Secrets:**

- `VPS_HOST`: Your VPS IP address or domain
- `VPS_USER`: SSH user (e.g., `deploy`)
- `VPS_SSH_KEY`: Private SSH key for authentication
- `VPS_PATH`: Deployment path (e.g., `/var/www/subcult`)

The workflow triggers on:

- Push to `main` branch
- Manual workflow dispatch

### Rollback Procedure

```bash
# SSH into server
ssh deploy@your-server

# Navigate to app directory
cd /var/www/subcult

# List backups
ls -la backups/

# Restore from backup
rsync -av backups/backup-YYYY-MM-DD-HHMMSS/ dist/

# Clear Nginx cache if needed
sudo rm -rf /var/cache/nginx/*
sudo systemctl reload nginx
```

---

## Environment Variables

### Required Variables

Create a `.env.production` file for production-specific configuration:

```bash
# API Configuration (future use)
VITE_API_URL=https://api.yourdomain.com

# Base URL
VITE_BASE_URL=https://yourdomain.com

# Analytics (if applicable)
VITE_ANALYTICS_ID=your-analytics-id

# Environment
NODE_ENV=production
```

### Build-time Variables

These are used during the build process:

```bash
# Build the application with environment variables
npm run build
```

Vite automatically includes variables prefixed with `VITE_` in the bundle.

### Server Environment Variables

For the deployment server:

```bash
# Edit ~/.bashrc or ~/.profile
nano ~/.bashrc

# Add variables
export DEPLOY_PATH="/var/www/subcult"
export BACKUP_PATH="/var/www/subcult/backups"

# Reload
source ~/.bashrc
```

---

## Monitoring & Logs

### Access Logs

Nginx access logs track all incoming requests:

```bash
# View access logs
sudo tail -f /var/log/nginx/subcult.access.log

# Analyze traffic patterns
sudo cat /var/log/nginx/subcult.access.log | awk '{print $1}' | sort | uniq -c | sort -rn | head -10
```

### Error Logs

Monitor application errors:

```bash
# View error logs
sudo tail -f /var/log/nginx/subcult.error.log

# Check for specific errors
sudo grep "error" /var/log/nginx/subcult.error.log
```

### Log Rotation

Configure log rotation to prevent disk space issues:

```bash
# Create log rotation configuration
sudo nano /etc/logrotate.d/subcult
```

```
/var/log/nginx/subcult.*.log {
    daily
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 www-data adm
    sharedscripts
    postrotate
        if [ -f /var/run/nginx.pid ]; then
            kill -USR1 `cat /var/run/nginx.pid`
        fi
    endscript
}
```

### Uptime Monitoring

Use external monitoring services:

- **UptimeRobot**: Free uptime monitoring
- **Pingdom**: Comprehensive monitoring
- **StatusCake**: Website monitoring
- **Datadog**: Full observability platform

Configure webhook alerts for downtime notifications.

### Performance Monitoring

```bash
# Install monitoring tools
sudo apt install -y htop iotop nethogs

# Monitor system resources
htop           # CPU and memory
iotop          # Disk I/O
nethogs        # Network usage

# Check Nginx status
sudo systemctl status nginx

# Check disk space
df -h

# Check memory usage
free -h
```

---

## Backup Strategy

### Automated Backups

Use the provided `scripts/backup.sh` script for automated backups:

```bash
# Make script executable
chmod +x scripts/backup.sh

# Run backup manually
./scripts/backup.sh

# Schedule automatic backups with cron
crontab -e
```

Add to crontab:

```
# Daily backup at 2 AM
0 2 * * * /var/www/subcult/scripts/backup.sh >> /var/log/subcult/backup.log 2>&1

# Weekly full backup on Sunday at 3 AM
0 3 * * 0 /var/www/subcult/scripts/backup.sh --full >> /var/log/subcult/backup.log 2>&1
```

### Backup Components

**1. Application Files:**

```bash
# Backup dist directory
tar -czf backup-$(date +%Y%m%d-%H%M%S).tar.gz dist/
```

**2. Nginx Configuration:**

```bash
# Backup Nginx config
sudo cp /etc/nginx/sites-available/subcult /var/www/subcult/backups/nginx-config-$(date +%Y%m%d).conf
```

**3. SSL Certificates:**

```bash
# Backup SSL certificates
sudo tar -czf ssl-backup-$(date +%Y%m%d).tar.gz /etc/letsencrypt/
```

### Backup Storage

**Local Storage:**

- Store backups in `/var/www/subcult/backups/`
- Retain last 7 daily backups
- Retain last 4 weekly backups

**Remote Storage (Recommended):**

- AWS S3
- Backblaze B2
- DigitalOcean Spaces
- rsync.net

### Restoration Procedure

**1. Stop Nginx:**

```bash
sudo systemctl stop nginx
```

**2. Restore files:**

```bash
# Extract backup
tar -xzf backup-YYYYMMDD-HHMMSS.tar.gz -C /var/www/subcult/

# Restore permissions
sudo chown -R deploy:deploy /var/www/subcult/dist
```

**3. Restart Nginx:**

```bash
sudo systemctl start nginx
```

**4. Verify:**

```bash
curl -I https://yourdomain.com
```

---

## Security Considerations

### Firewall Configuration

```bash
# Install UFW
sudo apt install -y ufw

# Default policies
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Allow SSH (change port if not default)
sudo ufw allow 22/tcp

# Allow HTTP and HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Enable firewall
sudo ufw enable
sudo ufw status
```

### SSH Hardening

```bash
# Edit SSH config
sudo nano /etc/ssh/sshd_config
```

Recommended settings:

```
# Disable root login
PermitRootLogin no

# Use key-based authentication only
PasswordAuthentication no
PubkeyAuthentication yes

# Change default port (optional but recommended)
Port 2222

# Disable empty passwords
PermitEmptyPasswords no

# Limit authentication attempts
MaxAuthTries 3
```

Restart SSH:

```bash
sudo systemctl restart sshd
```

### Nginx Security Headers

Already configured in `nginx.conf`:

- `X-Frame-Options`: Prevents clickjacking
- `X-Content-Type-Options`: Prevents MIME sniffing
- `X-XSS-Protection`: Enables XSS filtering
- `Referrer-Policy`: Controls referrer information
- `Permissions-Policy`: Controls browser features
- `Content-Security-Policy`: Prevents various injection attacks

### Rate Limiting

Nginx is configured with rate limiting to prevent abuse:

- 10 requests per second per IP
- Burst of 20 requests allowed
- Prevents DDoS and brute force attacks

### Regular Updates

```bash
# Create update script
sudo nano /usr/local/bin/update-system.sh
```

```bash
#!/bin/bash
apt update
apt upgrade -y
apt autoremove -y
systemctl restart nginx
```

```bash
# Make executable
sudo chmod +x /usr/local/bin/update-system.sh

# Schedule weekly updates
sudo crontab -e
```

Add to crontab:

```
# Weekly updates on Monday at 3 AM
0 3 * * 1 /usr/local/bin/update-system.sh >> /var/log/system-updates.log 2>&1
```

### Fail2Ban

Protect against brute force attacks:

```bash
# Install Fail2Ban
sudo apt install -y fail2ban

# Create local configuration
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
sudo nano /etc/fail2ban/jail.local
```

Configure SSH and Nginx protection:

```
[sshd]
enabled = true
port = 22
maxretry = 3
bantime = 3600

[nginx-limit-req]
enabled = true
port = http,https
maxretry = 5
bantime = 3600
```

Start Fail2Ban:

```bash
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

---

## Troubleshooting

### Common Issues

#### 1. 502 Bad Gateway

**Cause**: Nginx can't connect to the application

**Solution**:

```bash
# Check if files exist
ls -la /var/www/subcult/dist/

# Check Nginx error logs
sudo tail -f /var/log/nginx/subcult.error.log

# Verify Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

#### 2. SSL Certificate Issues

**Cause**: Certificate expired or misconfigured

**Solution**:

```bash
# Check certificate status
sudo certbot certificates

# Renew certificate
sudo certbot renew

# Force renew if needed
sudo certbot renew --force-renewal
```

#### 3. Permission Denied

**Cause**: Incorrect file permissions

**Solution**:

```bash
# Fix ownership
sudo chown -R deploy:deploy /var/www/subcult

# Fix directory permissions
sudo find /var/www/subcult/dist -type d -exec chmod 755 {} \;

# Fix file permissions
sudo find /var/www/subcult/dist -type f -exec chmod 644 {} \;
```

#### 4. Assets Not Loading

**Cause**: Incorrect base path or missing files

**Solution**:

```bash
# Verify files exist
ls -la /var/www/subcult/dist/assets/

# Check Nginx access logs
sudo tail -f /var/log/nginx/subcult.access.log

# Verify base path in vite.config.ts
cat vite.config.ts | grep base
```

#### 5. Routing Issues

**Cause**: SPA routing not configured correctly

**Solution**:

```bash
# Verify try_files directive in Nginx config
sudo grep "try_files" /etc/nginx/sites-available/subcult

# Should be: try_files $uri $uri/ /index.html;
```

### Performance Issues

**Check server resources:**

```bash
# CPU usage
top

# Memory usage
free -h

# Disk space
df -h

# I/O statistics
iostat -x 1
```

**Optimize Nginx:**

```bash
# Adjust worker processes
sudo nano /etc/nginx/nginx.conf

# Set to number of CPU cores
worker_processes auto;
```

### Log Analysis

```bash
# Find most accessed pages
sudo awk '{print $7}' /var/log/nginx/subcult.access.log | sort | uniq -c | sort -rn | head -10

# Find error status codes
sudo awk '$9 >= 400 {print $9}' /var/log/nginx/subcult.access.log | sort | uniq -c | sort -rn

# Find slow requests (if logged)
sudo awk '$11 > 1 {print $0}' /var/log/nginx/subcult.access.log
```

---

## Additional Resources

### Documentation

- [Nginx Documentation](https://nginx.org/en/docs/)
- [Let's Encrypt Documentation](https://letsencrypt.org/docs/)
- [UFW Documentation](https://help.ubuntu.com/community/UFW)
- [Fail2Ban Documentation](https://www.fail2ban.org/wiki/index.php/Main_Page)

### Useful Commands

```bash
# Check Nginx syntax
sudo nginx -t

# Reload Nginx (graceful)
sudo systemctl reload nginx

# Restart Nginx (full restart)
sudo systemctl restart nginx

# View Nginx status
sudo systemctl status nginx

# Check open ports
sudo netstat -tulpn

# Monitor real-time logs
sudo tail -f /var/log/nginx/*.log

# Check SSL certificate expiry
sudo certbot certificates

# Test SSL configuration
openssl s_client -connect yourdomain.com:443 -servername yourdomain.com
```

---

## Comparison: VPS vs GitHub Pages

| Feature             | GitHub Pages  | VPS                    |
| ------------------- | ------------- | ---------------------- |
| **Cost**            | Free          | $5-20/month            |
| **Setup**           | Easy          | Moderate               |
| **Control**         | Limited       | Full                   |
| **Custom Domain**   | Yes           | Yes                    |
| **SSL**             | Automatic     | Manual (Let's Encrypt) |
| **Server Config**   | No            | Yes                    |
| **Caching Control** | Limited       | Full                   |
| **Analytics**       | External only | Full control           |
| **Backend API**     | No            | Yes                    |
| **Database**        | No            | Yes                    |
| **Scaling**         | Automatic     | Manual                 |
| **Monitoring**      | Basic         | Full control           |

---

## Next Steps

After successful VPS deployment:

1. **Set up monitoring**: Configure uptime and performance monitoring
2. **Enable backups**: Schedule automated backups
3. **Test thoroughly**: Verify all routes and functionality
4. **Document**: Keep internal documentation of your specific setup
5. **Monitor**: Watch logs and performance metrics
6. **Update regularly**: Keep software and dependencies updated

For questions or issues, refer to the main [DEPLOYMENT.md](../DEPLOYMENT.md) guide or open an issue in the repository.
