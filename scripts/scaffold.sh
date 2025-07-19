#!/usr/bin/env bash

set -e

MONOREPO_NAME=${1:-monorepo}

echo "Creating monorepo: $MONOREPO_NAME"
mkdir -p "$MONOREPO_NAME"
cd "$MONOREPO_NAME"

# Root files
touch AUTHORS CHANGELOG.md CODE_OF_CONDUCT.md CONTRIBUTING.md FAQ.md LICENSE MAINTAINERS Makefile package.json pnpm-workspace.yaml renovate.json ROADMAP.md SECURITY.md STATUS.md ThirdPartyNotices.txt tsconfig.base.json turbo.json docker-compose.yml Dockerfile

# Changeset & CI
mkdir -p .changeset .circleci .husky .github/workflows

# Apps
mkdir -p apps/{admin,api/{graphql,rest},cli,docs,mobile,web,worker}

# Assets
mkdir -p assets/{diagrams,fonts,icons,logos,screenshots,style}

# Configs
mkdir -p config/{env,eslint,jest,prettier,storybook,tailwind,typescript}

touch config/env/schema.ts
touch config/eslint/base.js
touch config/jest/base.config.js
touch config/prettier/config.js
touch config/storybook/main.js
touch config/tailwind/tailwind.config.js
touch config/typescript/base.json
touch config/typescript/react.json
touch config/typescript/node
touch config/typescript/json

# Dev Experience
mkdir -p devex/{examples,prototypes,.vscode}

# Docs
mkdir -p docs/{design,specs}
touch docs/styleguide.md docs/glossary.md

# Infra
mkdir -p infra/{cd,env,helm,k8s,secrets,terraform}

# Packages
mkdir -p packages/{api-client,auth,config,hooks,ui,utils}

# Scripts
mkdir -p scripts
touch scripts/{bootstrap.sh,cleanup-containers.sh,start-local.sh,sync-env.sh}
chmod +x scripts/*.sh

# Tools
mkdir -p tools/{cli,codegen,lint-rules,project-scripts}

# Tests
mkdir -p tests/{benchmarks,e2e,integration,mocks,unit}

# Fix filename typo in CODE_OF_CONDUCT
mv CODE_OF_CONDUCT.md{commitlint.config.js,}
touch commitlint.config.js

echo "✅ Monorepo structure scaffolded successfully in: $MONOREPO_NAME"
