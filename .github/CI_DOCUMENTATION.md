# CI/CD Documentation

## Overview

This project uses GitHub Actions for Continuous Integration (CI) to ensure code quality, type safety, and build integrity. The CI pipeline runs automatically on every push to the main branch and on all pull requests.

## Workflows

### CI Workflow (`.github/workflows/ci.yml`)

The main CI workflow runs three parallel jobs:

#### 1. Lint & Type Check

- **Purpose**: Ensures code quality and type safety
- **Steps**:
  - Runs ESLint on all TypeScript/TSX files
  - Runs TypeScript compiler in check mode (`tsc -b --noEmit`)
  - Fails if any errors are found

#### 2. Build Verification

- **Purpose**: Verifies the project builds successfully
- **Steps**:
  - Runs production build (`npm run build`)
  - Verifies build artifacts exist (checks for `dist/` directory and `dist/index.html`)
  - Uploads build artifacts (available for 7 days)

#### 3. Dependency Security Audit

- **Purpose**: Checks for security vulnerabilities in dependencies
- **Steps**:
  - Runs `npm audit` with high severity threshold
  - Fails if high or critical vulnerabilities are found

### Dependency Review Workflow (`.github/workflows/dependency-review.yml`)

This workflow runs on pull requests to review dependency changes:

- **Purpose**: Reviews dependency changes for security vulnerabilities
- **Steps**:
  - Analyzes dependency changes in pull requests
  - Fails if high or critical severity vulnerabilities are introduced
  - Posts a summary comment on the pull request

### Deploy Workflow (`.github/workflows/deploy.yml`)

This workflow automatically deploys the site to GitHub Pages on every push to the main branch:

- **Purpose**: Automated deployment to GitHub Pages
- **Triggers**:
  - Push to main branch
  - Manual workflow dispatch
- **Steps**:
  - Build job: Builds production bundle and uploads as artifact
  - Deploy job: Deploys the build artifact to GitHub Pages
- **Permissions**: Requires `pages: write` and `id-token: write` permissions
- **Environment**: Deploys to `github-pages` environment
- **Deployment URL**: https://subculture-collective.github.io/

#### GitHub Pages Configuration

The deployment uses the following configuration:

1. **Base Path**: Set to `/` in `vite.config.ts` for the user site
2. **Jekyll**: Disabled via `.nojekyll` file in the public directory
3. **SPA Routing**: Handled via `404.html` fallback page that redirects to index.html
4. **Asset References**: All assets use absolute paths from root

## Performance Optimizations

### Dependency Caching

All workflows use `actions/setup-node@v4` with npm caching enabled. This significantly reduces build times by caching `node_modules` between runs.

### Parallel Jobs

The three CI jobs (lint, build, audit) run in parallel, reducing total pipeline time.

## Status Badges

The README includes a CI status badge that shows the current status of the main branch:

[![CI](https://github.com/subculture-collective/subculture-collective.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/subculture-collective/subculture-collective.github.io/actions/workflows/ci.yml)

## Local Development

You can run all CI checks locally before pushing:

```bash
# Install dependencies
npm install

# Run linting
npm run lint

# Run type checking
npx tsc -b --noEmit

# Run build
npm run build

# Run security audit
npm audit --audit-level=high

# Preview production build locally
npm run preview
```

### Testing GitHub Pages Configuration Locally

To test the production build locally with the same configuration as GitHub Pages:

```bash
# Build the production bundle
npm run build

# Preview the build (serves from dist/ directory)
npm run preview
```

The preview server will be available at `http://localhost:4173` by default.

## Troubleshooting

### Build Failures

If the build fails, check:

1. All dependencies are correctly installed (`package.json` and `package-lock.json` are in sync)
2. TypeScript compilation passes (`npx tsc -b --noEmit`)
3. No syntax errors in code

### Linting Errors

If linting fails:

1. Run `npm run lint` locally to see the errors
2. Many errors can be auto-fixed with `npm run lint -- --fix`
3. Update code to follow the ESLint rules defined in `eslint.config.js`

### Security Audit Failures

If the security audit fails:

1. Run `npm audit` locally to see vulnerabilities
2. Run `npm audit fix` to automatically fix vulnerabilities where possible
3. For vulnerabilities that can't be auto-fixed, manually update dependencies or evaluate the risk

### Dependency Review Failures

If dependency review fails on a PR:

1. Check the PR comment for details on which dependencies have vulnerabilities
2. Consider updating to a newer version without vulnerabilities
3. If no fix is available, evaluate the risk and document the decision

### Deployment Failures

If deployment to GitHub Pages fails:

1. Check the Actions tab for detailed error logs
2. Verify the build completes successfully (`npm run build`)
3. Ensure GitHub Pages is enabled in repository settings
4. Check that the deployment workflow has correct permissions:
   - `pages: write`
   - `id-token: write`
5. Verify the repository is configured to deploy from GitHub Actions (Settings → Pages → Source: GitHub Actions)

## Future Enhancements

Planned improvements to the CI/CD pipeline:

- Bundle size analysis to track asset sizes over time
- Lighthouse CI integration for performance, accessibility, and SEO scores
- Test coverage reporting
