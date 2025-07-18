#!/usr/bin/env bash

set -e

MONOREPO_NAME=${1:-monorepo}
AUTHOR_NAME=$(git config user.name || echo "Author")
AUTHOR_EMAIL=$(git config user.email || echo "author@example.com")
LICENSE_TYPE="MIT"

echo "🚀 Bootstrapping monorepo: $MONOREPO_NAME"

# Scaffold structure
./scaffold.sh "$MONOREPO_NAME"
cd "$MONOREPO_NAME"

# Initialize Git
git init
git branch -M main
touch .gitignore
echo "node_modules/" >> .gitignore
echo "dist/" >> .gitignore
echo ".turbo/" >> .gitignore

# Initialize pnpm
pnpm init -y

# Add workspace config
cat <<EOF > pnpm-workspace.yaml
packages:
  - "apps/*"
  - "packages/*"
  - "tools/*"
EOF

# Initialize README
cat <<EOF > README.md
# $MONOREPO_NAME

Welcome to **$MONOREPO_NAME** — a modern monorepo powered by [pnpm](https://pnpm.io), [Turborepo](https://turbo.build), and modular architecture.

## 📁 Structure

\`\`\`
apps/       # Deployable applications
packages/   # Shared libraries and modules
tools/      # Internal developer tools
config/     # Centralized tool configurations
infra/      # Infrastructure-as-Code
docs/       # Project and architecture documentation
\`\`\`

## 🚀 Getting Started

Install dependencies:

\`\`\`bash
pnpm install
\`\`\`

Run development:

\`\`\`bash
pnpm dev
\`\`\`

## 🧰 Tooling

- **TypeScript**
- **ESLint**
- **Prettier**
- **Turborepo**
- **Husky + lint-staged**
- **GitHub Actions**
EOF

# Initialize TypeScript
pnpm add -D typescript
npx tsc --init --rootDir . --outDir dist --declaration

# Install basic tools
pnpm add -D eslint prettier turbo husky lint-staged commitlint @commitlint/config-conventional

# Turbo config
cat <<EOF > turbo.json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "dev": {
      "cache": false
    },
    "lint": {
      "outputs": []
    }
  }
}
EOF

# Husky init
pnpm husky install
npx husky add .husky/pre-commit "pnpm lint-staged"

# Lint-staged config
cat <<EOF > lint-staged.config.js
module.exports = {
  "**/*.{js,ts,tsx,json,md}": ["prettier --write"]
};
EOF

# Commitlint config
cat <<EOF > commitlint.config.js
module.exports = {
  extends: ["@commitlint/config-conventional"]
};
EOF

# Prettier config
cat <<EOF > .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "printWidth": 100,
  "trailingComma": "all"
}
EOF

# ESLint config (basic)
cat <<EOF > .eslintrc.json
{
  "root": true,
  "extends": ["eslint:recommended"],
  "env": {
    "node": true,
    "es2021": true
  }
}
EOF

# GitHub Actions
mkdir -p .github/workflows
cat <<EOF > .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm run build --filter=...
EOF

# Initial Commit
git add .
git commit -m "chore: bootstrap monorepo with tooling"

echo "✅ $MONOREPO_NAME is ready to go!"
