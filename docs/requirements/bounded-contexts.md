# Bounded Contexts

This document defines the primary **bounded contexts** that structure the AIC AI Platform. These contexts align with business capabilities and allow each domain to evolve independently using Domain-Driven Design (DDD), Clean Architecture, and event-driven principles.

---

## Overview

Bounded contexts are logical partitions of the platform that encapsulate domain models, services, and data. Each context represents a single business capability or core responsibility. Communication between them occurs via events or well-defined APIs.

---

## Context Map

| Bounded Context       | Description |
|-----------------------|-------------|
| **Auth**              | Manages identity, authentication, authorization, session lifecycle, roles, and permissions. |
| **Clients**           | Client onboarding, workspace management, subscriptions, usage quotas, and team access. |
| **Consultants**       | Internal consultant profiles, engagement history, skills, certifications. |
| **Engagements**       | AI transformation projects, deliverables, milestones, outcomes, and collaboration. |
| **AI Workspace**      | Low-code AI modeling interface, prompt templates, model orchestration, dataset workflows. |
| **Assessments**       | Capability assessments, readiness surveys, client maturity models. |
| **Templates**         | Reusable prompt templates, workflows, and AI transformation artifacts. |
| **Solutions**         | Solution blueprints, packaged AI modules, reusable implementation patterns. |
| **Billing**           | Pricing plans, invoices, payments, usage metering, and receipts. |
| **Marketplace**       | Third-party apps, vendor listings, API integrations, and extensions. |
| **Notifications**     | Alerts, emails, in-app messages, domain events routing. |
| **Support**           | Ticketing, live chat, knowledge base, service status. |
| **Tenancy**           | Multi-tenant isolation, workspace provisioning, context scoping. |
| **Developer Tools**   | API key management, SDKs, webhooks, GraphQL playground, CLI sandbox. |
| **Investor Relations**| Reporting, KPI dashboards, VDR access, compliance readiness. |
| **Marketing Site**    | Web presence, landing pages, blog, lead capture, SEO. |

---

## Context Relationships

- **Auth** is a shared foundational context.
- **Tenancy** acts as a root context that governs access to other contexts.
- **AI Workspace**, **Engagements**, and **Solutions** form the core transformation engine.
- **Clients**, **Billing**, **Support**, and **Investor Relations** are orthogonal operational domains.
- **Templates**, **Assessments**, and **Developer Tools** are enabling contexts.
- **Marketplace** introduces modular extension points via vendor participation.

---

## Context Patterns

- **Shared Kernel:** Between `Auth` and `Clients` for user metadata and team access.
- **Anticorruption Layer:** Between `Marketplace` and `AI Workspace` for sandboxing vendor modules.
- **Conformist:** Most portals conform to `Tenancy` boundaries.
- **Upstream/Downstream:**
  - `Auth` → downstream to all others.
  - `AI Workspace` ← upstream from `Templates`, `Assessments`, `Solutions`.
  - `Notifications` is downstream of nearly every event-emitting context.

---

## Example: AI Workspace Context

**Responsibilities:**
- Prompt engineering
- Dataset creation and mapping
- Experiment versioning
- Result visualizations

**Boundaries:**
- Cannot call billing directly — must emit `ModelExecutionBilled` event
- Cannot modify users — must defer to Auth context
- Exposes APIs to apps like Client Dashboard and Web

---

## Development Structure

Each context is implemented as a microservice with:
- `domain/` (aggregates, events, services, value objects)
- `application/` (commands, queries, use cases)
- `interfaces/` (REST, GraphQL, CLI)
- `infrastructure/` (persistence, event store, brokers)

Example:
```bash
services/ai-workspace/
├── domain/
├── application/
├── interfaces/
├── infrastructure/
├── tests/
└── README.md
