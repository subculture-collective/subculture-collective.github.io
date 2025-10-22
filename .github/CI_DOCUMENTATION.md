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
```

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

## Future Enhancements

Planned improvements to the CI pipeline:

- Bundle size analysis to track asset sizes over time
- Lighthouse CI integration for performance, accessibility, and SEO scores
- Automated deployment to GitHub Pages on successful builds
- Test coverage reporting
