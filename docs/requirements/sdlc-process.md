# Software Development Lifecycle (SDLC) for AIC AI Platform

This document defines the structured software development lifecycle (SDLC) for the Applied Innovation Corporation’s AI Platform and consulting products. It aligns with modern agile, DevSecOps, and domain-driven principles to support continuous delivery, quality assurance, and multi-team collaboration.

---

## 1. Overview

The AIC SDLC ensures that all changes—whether for consulting projects, the PaaS platform, or internal tools—are consistently designed, implemented, tested, and delivered through a repeatable pipeline.

The process balances agility with governance to support:
- Modular microservice development
- Multi-tenant requirements
- AI/ML-driven applications
- Enterprise-grade reliability

---

## 2. SDLC Phases

### Phase 1: Ideation & Discovery

- Capture business goals and user needs.
- Conduct stakeholder interviews.
- Align on bounded contexts and domains (DDD).
- Create initial architecture decision records (ADRs).
- Define epics, user stories, and acceptance criteria.

**Artifacts**:
- `docs/architecture/adr/`
- `docs/requirements/software-requirements-document.md`
- Ubiquitous language definitions
- Project charter and roadmap

---

### Phase 2: Design & Modeling

- Draft initial solution architecture (MACH, Hexagonal).
- Identify core aggregates, domain services, and event flows.
- Define bounded contexts and context maps.
- Write policy and event models.
- Refine workflows, data models, and interaction contracts.

**Artifacts**:
- `docs/architecture/bounded-contexts.md`
- `docs/architecture/events.md`
- `docs/architecture/context-maps/`
- Diagrams in `assets/diagrams/` and `docs/architecture/diagrams/`

---

### Phase 3: Planning & Estimation

- Assign tasks to cross-functional teams (apps, services, DevOps).
- Use agile/sprint-based planning (2-week sprints).
- Tag tickets by domain, service, or portal.
- Prioritize feature flags and domain slices for phased rollout.

**Tools**:
- Linear, Jira, or GitHub Projects
- GitHub labels for services/contexts

---

### Phase 4: Implementation

- Scaffold new entities via CLI (`tools/cli`)
- Write code using event-driven, modular design.
- Follow versioning standards (e.g., v1 domain events).
- Ensure separation of concerns (UI, application, domain, infra).
- Use feature flags for risky changes.

**Conventions**:
- Commitlint, conventional commits
- Format via Prettier
- Typed using TypeScript (Node), Zod for schema validation
- Changesets for versioning

---

### Phase 5: Testing

- Write tests per layer:
  - Unit: value objects, domain services
  - Integration: service-to-service, database, event bus
  - E2E: portal UIs, API flows
- Generate coverage reports.
- Validate accessibility, security, and linting on every PR.

**Frameworks**:
- Jest, Vitest, Playwright
- ESLint, Stylelint, Lighthouse

---

### Phase 6: Review & QA

- Pull request checks:
  - Turbo task graph
  - Changeset bump
  - Lint + format
  - Test pass
  - Preview link (Vercel/Netlify)
- Approval required from:
  - Tech lead for core changes
  - QA or SRE for infra-sensitive deployments

---

### Phase 7: Deployment

- Dev → Staging → Production promotion flow.
- GitOps used to deploy with ArgoCD + Helm.
- Apply canary strategy for new endpoints.
- Post-deploy monitoring via OpenTelemetry + Grafana.

**Artifacts**:
- Docker image in GitHub Registry
- Helm chart updated per service
- PNPM workspace updated via CLI

---

### Phase 8: Monitoring & Feedback

- Logs and metrics via Loki, Prometheus.
- Trace flows via Tempo, Jaeger.
- Incident response via PagerDuty, Sentry.
- Usage analytics from telemetry and event logs.
- Feedback loop into next sprint via retrospectives.

---

## 3. Automation Support

- `scripts/scaffold-entity.sh` — Bootstrap packages, services
- `tools/cli/generators/` — Auto-generate boilerplate
- `.github/workflows/ci.yml` — CI integration
- `.changeset/` — Versioning
- `turbo.json` — Dev & build orchestration
- GitHub Actions or CircleCI for testing, linting, preview

---

## 4. Roles & Responsibilities

| Role       | Responsibility |
|------------|----------------|
| **Tech Lead** | Design reviews, architecture decisions, CI enforcement |
| **Developer** | Feature development, domain modeling, testing |
| **QA Engineer** | Write and execute test plans |
| **DevOps** | Deployment pipelines, IaC maintenance |
| **Product Owner** | Define requirements, prioritize backlog |
| **Security** | Threat modeling, code scanning, compliance checks |

---

## 5. Versioning & Change Management

- Semantic versioning enforced per package/service
- Events, services, and packages support v1, v2 folders
- Changelogs generated via Changesets
- All changes traceable via commit history, ADRs, and PRs

---

## 6. Governance & Compliance

- License: Proprietary + Educational/Internal Use
- Security requirements documented in `security.md`
- DevOps standards in `devops.md`
- Data protection measures aligned with SOC2 & GDPR targets

---

## 7. SDLC Diagram

_TODO_: Add visual SDLC pipeline diagram under `docs/architecture/diagrams/sdlc.png`

---

Would you like me to now generate `docs/domains/mlops.md`, `docs/domains/data-governance.md`, or perhaps generate the accompanying SDLC diagram next?
