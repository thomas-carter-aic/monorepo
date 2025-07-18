# FAQ

### Why a monorepo?

We chose a monorepo for better code reuse, atomic changes, and consistent tooling.

### What tools are used?

- pnpm for workspace management
- Turborepo for task orchestration
- ESLint + Prettier + TypeScript for consistency

### How do I start development?

```bash
pnpm install
pnpm dev

### How do I add a new app or package?

```bash
pnpm scaffold
