# VPS Deployment Setup Checklist

This checklist provides a step-by-step guide for setting up VPS deployment for SubCult.TV.

## Prerequisites Checklist

- [ ] VPS server purchased and accessible
- [ ] Domain name registered and DNS configured
- [ ] SSH key pair generated
- [ ] GitHub repository access configured
- [ ] Local development environment set up

## Server Setup Checklist

### Initial Configuration

- [ ] Connect to VPS via SSH
- [ ] Update system packages (`sudo apt update && sudo apt upgrade -y`)
- [ ] Set up firewall (UFW or iptables)
- [ ] Configure SSH for security (disable root login, key-only auth)
- [ ] Create deployment user
- [ ] Add SSH key for deployment user

### Software Installation

- [ ] Install Node.js 20.x LTS
- [ ] Install npm
- [ ] Install Nginx
- [ ] Install Git
- [ ] Install Certbot (for SSL)
- [ ] Verify all installations

### Directory Structure

- [ ] Create application directory (`/var/www/subcult`)
- [ ] Create logs directory (`/var/log/subcult`)
- [ ] Create backup directory (`/var/www/subcult/backups`)
- [ ] Set correct ownership and permissions

## Domain Configuration Checklist

- [ ] Configure A record pointing to VPS IP
- [ ] Configure www subdomain (optional)
- [ ] Wait for DNS propagation
- [ ] Verify DNS resolution with `dig` or `nslookup`

## SSL Certificate Checklist

- [ ] Install Certbot
- [ ] Obtain SSL certificate from Let's Encrypt
- [ ] Verify certificate installation
- [ ] Test automatic renewal
- [ ] Configure certificate renewal notifications

## Nginx Configuration Checklist

- [ ] Copy `nginx.conf` template to server
- [ ] Update domain name in configuration
- [ ] Update SSL certificate paths
- [ ] Review and customize security headers
- [ ] Enable site configuration
- [ ] Test Nginx configuration (`sudo nginx -t`)
- [ ] Reload Nginx

## Deployment Configuration Checklist

### Local Setup

- [ ] Review `deploy-vps.sh` script
- [ ] Set environment variables in local shell
- [ ] Test SSH connection to VPS
- [ ] Verify build process works locally

### GitHub Actions Setup

- [ ] Add GitHub Secrets:
  - [ ] `VPS_HOST` - VPS IP or domain
  - [ ] `VPS_USER` - SSH username
  - [ ] `VPS_SSH_KEY` - Private SSH key
  - [ ] `VPS_PATH` - Deployment path
  - [ ] `VPS_PORT` - SSH port (optional)
- [ ] Add GitHub Variables:
  - [ ] `VPS_DEPLOYMENT_ENABLED` - Set to `true`
  - [ ] `VPS_HEALTH_CHECK_URL` - Site URL for health checks
- [ ] Review `.github/workflows/deploy-vps.yml`
- [ ] Test workflow manually

### Environment Variables

- [ ] Copy `.env.production.example` to `.env.production`
- [ ] Configure production environment variables
- [ ] Ensure `.env.production` is in `.gitignore`
- [ ] Document any required variables

## Security Checklist

### Firewall Configuration

- [ ] Allow SSH (port 22 or custom)
- [ ] Allow HTTP (port 80)
- [ ] Allow HTTPS (port 443)
- [ ] Enable firewall
- [ ] Test firewall rules

### SSH Hardening

- [ ] Disable root login
- [ ] Disable password authentication
- [ ] Change default SSH port (optional)
- [ ] Configure fail2ban
- [ ] Set up SSH key rotation policy

### Nginx Security

- [ ] Configure security headers
- [ ] Set up rate limiting
- [ ] Configure SSL/TLS properly
- [ ] Test SSL configuration (SSL Labs)
- [ ] Review access control

### System Security

- [ ] Configure automatic security updates
- [ ] Set up intrusion detection (optional)
- [ ] Configure log monitoring
- [ ] Set up backup encryption (optional)

## Backup Configuration Checklist

- [ ] Review `scripts/backup.sh`
- [ ] Configure backup retention policy
- [ ] Set up automated backups with cron
- [ ] Test backup creation
- [ ] Test backup restoration
- [ ] Configure remote backup storage (optional)
- [ ] Set up backup monitoring

## Monitoring Setup Checklist

### Logs

- [ ] Configure Nginx access logs
- [ ] Configure Nginx error logs
- [ ] Set up log rotation
- [ ] Test log access

### Uptime Monitoring

- [ ] Set up external uptime monitoring service
- [ ] Configure downtime alerts
- [ ] Test alert notifications

### Performance Monitoring

- [ ] Install system monitoring tools
- [ ] Monitor CPU usage
- [ ] Monitor memory usage
- [ ] Monitor disk space
- [ ] Monitor network usage

### Application Monitoring

- [ ] Set up error tracking (optional)
- [ ] Configure performance monitoring (optional)
- [ ] Set up analytics (optional)

## Testing Checklist

### Initial Deployment

- [ ] Deploy to VPS manually using `deploy-vps.sh`
- [ ] Verify site is accessible via HTTPS
- [ ] Test all routes and functionality
- [ ] Test SPA routing (refresh on different routes)
- [ ] Verify assets load correctly
- [ ] Test on multiple browsers
- [ ] Test on mobile devices

### Deployment Process

- [ ] Test automated deployment via GitHub Actions
- [ ] Verify health checks work
- [ ] Test rollback procedure
- [ ] Verify backup creation during deployment

### Performance

- [ ] Run Lighthouse audit
- [ ] Test page load times
- [ ] Verify compression is working (Gzip/Brotli)
- [ ] Check asset caching
- [ ] Test from different geographic locations

### Security

- [ ] Run SSL Labs test
- [ ] Test security headers (securityheaders.com)
- [ ] Verify rate limiting works
- [ ] Test for common vulnerabilities

## Documentation Checklist

- [ ] Document server specifications
- [ ] Document domain configuration
- [ ] Document deployment process
- [ ] Document backup procedures
- [ ] Document rollback procedures
- [ ] Document monitoring setup
- [ ] Create incident response plan
- [ ] Document maintenance procedures

## Maintenance Checklist

### Daily

- [ ] Check uptime monitoring dashboard
- [ ] Review error logs (if issues reported)

### Weekly

- [ ] Review access logs
- [ ] Check disk space
- [ ] Verify backups are running

### Monthly

- [ ] Review security logs
- [ ] Update system packages
- [ ] Test backup restoration
- [ ] Review SSL certificate expiry
- [ ] Check performance metrics

### Quarterly

- [ ] Security audit
- [ ] Review and update documentation
- [ ] Test disaster recovery plan
- [ ] Review and update backup retention policy

## Troubleshooting Checklist

If deployment fails:

- [ ] Check GitHub Actions logs
- [ ] Verify SSH connection works
- [ ] Check server disk space
- [ ] Review Nginx error logs
- [ ] Verify file permissions
- [ ] Test build process locally
- [ ] Check DNS resolution
- [ ] Verify SSL certificate is valid

If site is down:

- [ ] Check Nginx status
- [ ] Review error logs
- [ ] Check server resources
- [ ] Verify DNS is working
- [ ] Check SSL certificate
- [ ] Review recent changes
- [ ] Consider rollback

## Completion

Once all items are checked:

- [ ] Document custom configurations
- [ ] Create internal runbook
- [ ] Share access credentials securely
- [ ] Set up notification channels
- [ ] Schedule regular reviews

---

## Quick Reference

### Important Commands

```bash
# Check Nginx status
sudo systemctl status nginx

# Reload Nginx
sudo systemctl reload nginx

# View error logs
sudo tail -f /var/log/nginx/subcult.error.log

# View access logs
sudo tail -f /var/log/nginx/subcult.access.log

# Check disk space
df -h

# Check SSL certificate
sudo certbot certificates

# Run backup manually
./scripts/backup.sh

# Deploy manually
./deploy-vps.sh
```

### Important Paths

- Application: `/var/www/subcult/dist`
- Backups: `/var/www/subcult/backups`
- Nginx config: `/etc/nginx/sites-available/subcult`
- SSL certificates: `/etc/letsencrypt/live/yourdomain.com`
- Logs: `/var/log/nginx/`

### Support Resources

- [VPS Deployment Guide](./VPS_DEPLOYMENT.md)
- [Main Deployment Guide](../DEPLOYMENT.md)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Let's Encrypt Documentation](https://letsencrypt.org/docs/)
