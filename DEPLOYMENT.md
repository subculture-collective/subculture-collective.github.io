# GitHub Pages Deployment Guide

## Overview

This project is automatically deployed to GitHub Pages using GitHub Actions. The deployment happens automatically on every push to the `main` branch.

## Live Site

The site is deployed at: **https://subculture-collective.github.io/**

## Deployment Architecture

### Automatic Deployment

The deployment workflow (`.github/workflows/deploy.yml`) consists of two jobs:

1. **Build Job**: Compiles the production bundle
2. **Deploy Job**: Deploys the build artifact to GitHub Pages

### Configuration Files

#### 1. Vite Configuration (`vite.config.ts`)

```typescript
export default defineConfig({
  base: '/', // Root path for user GitHub Pages site
  plugins: [react()],
  // ... other config
})
```

- **Base Path**: Set to `/` since this is a user/organization site (`*.github.io`)
- **Asset References**: All assets use absolute paths from root

#### 2. SPA Routing Fallback (`public/404.html`)

GitHub Pages doesn't natively support client-side routing. The `404.html` file implements the [SPA GitHub Pages](https://github.com/rafgraph/spa-github-pages) pattern:

- Redirects 404 errors to the main app
- Preserves the requested path for client-side routing
- Allows React Router to handle all routes

#### 3. Jekyll Configuration (`public/.nojekyll`)

An empty `.nojekyll` file disables Jekyll processing on GitHub Pages:

- Prevents GitHub from treating the site as a Jekyll site
- Allows files/folders starting with underscore
- Ensures all Vite-generated files are served correctly

## Deployment Workflow

### Triggers

The deployment workflow runs on:

1. **Push to main**: Automatic deployment on every commit to main
2. **Manual trigger**: Can be triggered manually from the Actions tab

### Permissions

The workflow requires these GitHub token permissions:

```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

### Deployment Steps

1. **Checkout Code**: Clones the repository
2. **Setup Node.js**: Installs Node.js 20 with npm caching
3. **Install Dependencies**: Runs `npm ci` for clean install
4. **Build**: Runs `npm run build` to create production bundle
5. **Upload Artifact**: Uploads the `dist/` directory
6. **Deploy**: Deploys the artifact to GitHub Pages

### Concurrency

```yaml
concurrency:
  group: pages
  cancel-in-progress: false
```

- Only one deployment runs at a time
- Queued deployments wait for the current one to complete
- In-progress deployments are NOT cancelled

## Manual Deployment

While automatic deployment is configured, you can manually trigger a deployment:

1. Go to the repository's Actions tab
2. Select the "Deploy to GitHub Pages" workflow
3. Click "Run workflow"
4. Select the branch (main) and click "Run workflow"

## Testing Locally

Before pushing changes, test the production build locally:

```bash
# Build production bundle
npm run build

# Preview the production build
npm run preview
```

The preview server will run at `http://localhost:4173` by default.

## Repository Settings

Ensure GitHub Pages is configured correctly:

1. Go to **Settings** → **Pages**
2. **Source**: GitHub Actions
3. **Custom domain**: (Optional) Configure if using a custom domain
4. **Enforce HTTPS**: Should be enabled

## Troubleshooting

### Deployment Fails

1. **Check Build Logs**: Review the workflow logs in the Actions tab
2. **Test Locally**: Run `npm run build` locally to catch build errors
3. **Permissions**: Verify the workflow has required permissions
4. **GitHub Pages**: Ensure Pages is enabled and set to "GitHub Actions"

### Assets Not Loading

1. **Base Path**: Verify `base: '/'` in `vite.config.ts`
2. **Asset Paths**: Check that assets use absolute paths (starting with `/`)
3. **Browser Console**: Check for 404 errors on assets

### Routing Issues

1. **404.html**: Ensure `public/404.html` exists and is correctly configured
2. **React Router**: Verify router configuration uses correct basename
3. **Test Routes**: After deployment, test all routes to ensure they work

### Build Performance

Current build metrics:

- Build time: ~800ms
- Bundle size: ~377 KB (gzipped: ~118 KB)
- CSS size: ~23 KB (gzipped: ~5 KB)

## Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file to the `public/` directory with your domain
2. Configure DNS records with your domain provider
3. Update GitHub Pages settings to use the custom domain
4. Enable "Enforce HTTPS" after DNS propagation

Example `public/CNAME`:

```
yourdomain.com
```

## Build Artifacts

The build process generates:

```
dist/
├── .nojekyll           # Disables Jekyll
├── 404.html           # SPA routing fallback
├── index.html         # Main HTML entry
├── vite.svg          # Favicon
└── assets/
    ├── index-[hash].css
    └── index-[hash].js
```

All these files are deployed to GitHub Pages.

## Monitoring

### Deployment Status

- **Actions Tab**: View deployment status and logs
- **Environments**: View deployment history in the Environments section
- **Status Checks**: CI must pass before deployment runs

### Deployment History

View past deployments:

1. Go to **Settings** → **Environments** → **github-pages**
2. See deployment history with timestamps and commit SHAs
3. Each deployment links to the workflow run

## Security

### Secrets and Variables

The deployment workflow uses:

- **`GITHUB_TOKEN`**: Automatically provided by GitHub Actions
- No additional secrets required

### Content Security

- All code is built in GitHub's infrastructure
- No external services or API keys required
- Secrets should never be committed to the repository

## CI/CD Integration

The deployment workflow complements the existing CI workflow:

- **CI Workflow**: Runs on all branches (lint, test, build verification)
- **Deploy Workflow**: Runs only on main branch after CI passes
- Both workflows can run in parallel on push to main

## Performance Optimization

### Caching

- **npm dependencies**: Cached via `actions/setup-node@v4`
- Reduces build time from ~60s to ~10s on cache hit

### Bundle Optimization

- Vite automatically optimizes the production bundle
- Code splitting enabled by default
- Assets hashed for cache busting

## Alternative Deployment: VPS

For greater control and flexibility, you can deploy to a Virtual Private Server (VPS) instead of GitHub Pages. This allows for custom server configurations, backend API integration, and more.

### VPS Deployment Documentation

- **[VPS Deployment Guide](./docs/VPS_DEPLOYMENT.md)** - Comprehensive guide covering server setup, Nginx configuration, SSL, security, and monitoring
- **[VPS Quick Start](./docs/VPS_QUICKSTART.md)** - Get up and running in 30 minutes
- **[VPS Setup Checklist](./docs/VPS_SETUP_CHECKLIST.md)** - Step-by-step checklist for VPS deployment

### VPS Deployment Features

- **Full server control**: Configure Nginx, SSL, caching, and security
- **Automated deployment**: Deploy via SSH with GitHub Actions
- **Backup system**: Automated daily/weekly backups with restoration
- **Health checks**: Post-deployment verification and automatic rollback
- **Monitoring**: Comprehensive logging and uptime monitoring
- **Security**: Firewall, rate limiting, SSL/TLS, and security headers

### Quick VPS Deployment

```bash
# Set environment variables
export VPS_HOST=yourdomain.com
export VPS_USER=deploy
export HEALTH_CHECK_URL=https://yourdomain.com

# Deploy to VPS
./deploy-vps.sh
```

See the [VPS Deployment Guide](./docs/VPS_DEPLOYMENT.md) for complete instructions.

## Future Enhancements

Planned improvements:

- **Custom domain**: Add CNAME if domain is acquired
- **Deployment notifications**: Slack/Discord notifications on deployment
- **Preview deployments**: Deploy PR previews to separate URLs
- **Performance monitoring**: Lighthouse CI integration
- **Bundle analysis**: Track bundle size over time
