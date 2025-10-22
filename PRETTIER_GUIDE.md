# Prettier Code Formatting Guide

This project uses [Prettier](https://prettier.io/) for consistent code formatting
across the entire codebase.

## Overview

Prettier is an opinionated code formatter that enforces a consistent style by
parsing your code and reprinting it with its own rules. This eliminates debates
about code style and makes the codebase more maintainable.

## Configuration

The project's Prettier configuration is defined in `.prettierrc.json`:

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
```

### Configuration Details

- **semi**: No semicolons at the end of statements
- **singleQuote**: Use single quotes instead of double quotes
- **tabWidth**: Use 2 spaces for indentation
- **trailingComma**: Add trailing commas where valid in ES5 (objects, arrays,
  etc.)
- **printWidth**: Wrap lines at 80 characters
- **arrowParens**: Omit parentheses when possible in arrow functions (e.g.,
  `x => x`)
- **endOfLine**: Use Unix line endings (LF)

## Editor Setup

### VS Code

The project includes VS Code settings in `.vscode/settings.json` that enable:

- **Format on Save**: Automatically formats files when you save them
- **Prettier as Default Formatter**: Uses Prettier for all supported file types
- **ESLint Integration**: Runs ESLint fixes on save as well

To use these settings:

1. Install the
   [Prettier VS Code extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
2. Open the project in VS Code
3. The settings will be applied automatically

### Other Editors

For other editors, refer to the
[Prettier editor integration guide](https://prettier.io/docs/en/editors.html).

## NPM Scripts

The project includes several formatting scripts:

### Format All Files

```bash
npm run format
```

Formats all files in the project according to Prettier rules.

### Check Formatting

```bash
npm run format:check
```

Checks if all files are formatted correctly without making changes. This is used
in CI to ensure code is properly formatted.

## Pre-commit Hook

The project uses Husky and lint-staged to automatically format staged files
before commit:

- **Staged `.ts`, `.tsx`, `.js`, `.jsx` files**: Run ESLint fixes and Prettier
  formatting
- **Staged `.json`, `.md`, `.yml`, `.yaml` files**: Run Prettier formatting

This ensures that all committed code is properly formatted.

## CI Integration

The CI pipeline includes a formatting check that runs on all pull requests:

```yaml
- name: Check code formatting
  run: npm run format:check
```

If code is not properly formatted, the CI check will fail, and you'll need to
run `npm run format` and commit the changes.

## Excluded Files

The following files and directories are excluded from formatting (see
`.prettierignore`):

- `node_modules/` - Dependencies
- `dist/`, `dist-ssr/`, `build/` - Build outputs
- `coverage/` - Test coverage reports
- `package-lock.json`, `yarn.lock`, `pnpm-lock.yaml` - Lock files
- Log files and local environment files

## Integration with ESLint

Prettier is integrated with ESLint through the `eslint-plugin-prettier` plugin.
This means:

- ESLint will report Prettier formatting issues as warnings
- Running `npm run lint:fix` will apply both ESLint and Prettier fixes
- The ESLint and Prettier configurations are kept in sync

## Best Practices

### 1. Format Before Committing

Always run `npm run format` before creating a pull request if you're not using
the pre-commit hook.

### 2. Don't Fight the Formatter

Prettier is opinionated by design. Accept its formatting decisions rather than
trying to work around them.

### 3. Use Editor Integration

Set up your editor to format on save. This provides immediate feedback and
reduces the need to run formatting commands manually.

### 4. Format Entire Files

Prettier works best when it formats entire files. Avoid partially formatted
code.

### 5. Review Formatting Changes

When Prettier makes significant formatting changes, review them to ensure they
don't affect code logic.

## Troubleshooting

### Files Not Formatting on Save

1. Ensure the Prettier extension is installed in your editor
2. Check that `.vscode/settings.json` is being applied
3. Verify that the file type is supported by Prettier
4. Check for syntax errors that prevent Prettier from parsing the file

### Formatting Conflicts with ESLint

The ESLint configuration includes the Prettier plugin, which should prevent
conflicts. If you encounter conflicts:

1. Check that both `.prettierrc.json` and `eslint.config.js` have matching
   Prettier settings
2. Run `npm run lint:fix` to apply both ESLint and Prettier fixes

### CI Formatting Check Failing

If the CI formatting check fails:

1. Run `npm run format:check` locally to see which files need formatting
2. Run `npm run format` to fix the issues
3. Commit and push the changes

## Additional Resources

- [Prettier Documentation](https://prettier.io/docs/en/)
- [Prettier Playground](https://prettier.io/playground/) - Test formatting
  online
- [Editor Integration](https://prettier.io/docs/en/editors.html)
- [ESLint Integration](https://prettier.io/docs/en/integrating-with-linters.html)
