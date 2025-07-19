# Context Maps for AIC AI Platform

This document visualizes and describes the relationships, boundaries, and integration styles between bounded contexts in the AIC AI Platform using Domain-Driven Design (DDD) strategic patterns.

---

## 1. Purpose

To clarify how each bounded context (e.g., Auth, Clients, Billing, Projects) interacts within the platform, enabling informed decisions around autonomy, integration, and evolution.

---

## 2. Bounded Context Relationships

The platform is composed of several core domains and supporting subdomains. Each is designed as an independent context with clear ownership, and they interact through events and APIs.

### Context Relationship Matrix

| Upstream Context     | Downstream Context      | Relationship Type        | Integration Method         |
|----------------------|-------------------------|---------------------------|-----------------------------|
| **Auth**             | All contexts            | Shared Kernel             | Library, Auth tokens        |
| **Clients**          | Billing, Projects       | Customer/Supplier         | REST API, Events            |
| **Billing**          | Auth, Clients           | Conformist                | Event-Driven, Contracts     |
| **AI Workspace**     | Projects, Models        | Customer/Supplier         | Event Bus, CQRS             |
| **Projects**         | Templates, Models       | Open Host Service         | Commands, Queries           |
| **Marketplace**      | AI Workspace, Vendors   | Anticorruption Layer      | Mapping Layer               |
| **Support**          | Clients, Auth           | Conformist                | REST API                    |
| **Investor Relations**| Finance, Billing       | Customer/Supplier         | Reports, Read Projections   |

---

## 3. Strategic Relationship Types

### 🔁 Shared Kernel
- **Contexts**: `auth`, `domain-events`, `permissions`
- **Pattern**: Shared codebases (e.g., session validation, JWT parsing, roles)

### 🔄 Customer/Supplier
- **Example**: `clients` supplies onboarding events to `billing` and `projects`
- **Contract**: Explicit event schemas + versioned interfaces

### ⛓ Conformist
- **Example**: `support` conforms to `clients` schema for tickets
- **Risk**: Tight coupling; mitigated with strong schema versioning

### 🔁 Open Host Service
- **Example**: `projects` exposes service methods for `templates`
- **Contract**: Open API endpoints with schema validation (e.g., Zod)

### 🚧 Anticorruption Layer (ACL)
- **Example**: `marketplace` integrates with `ai-workspace` via adapter
- **Goal**: Prevent leaking internal abstractions or data shapes

---

## 4. Integration Styles

| Style               | Used By               | Transport     | Notes                               |
|--------------------|-----------------------|---------------|-------------------------------------|
| Event-Driven       | `billing`, `support`  | NATS, Kafka   | Async, loose coupling               |
| REST API           | `clients`, `support`  | HTTPS         | Authenticated via bearer tokens     |
| GraphQL Federation | `developer-portal`    | GraphQL       | Composition of APIs from services   |
| RPC (future)       | TBD                   | gRPC/JSON-RPC | Only if ultra-perf is needed        |
| Shared Libraries   | `auth`, `utils`       | Local import  | Used for validation and permissions |

---

## 5. Diagram (To Be Added)

_TODO_: Add visual context map diagram at `docs/architecture/diagrams/context-map.png`.

- Colored domains (core, supporting, generic)
- Arrows indicating relationship direction and style
- Legends for relationship types

---

## 6. Versioning Strategy

- All service and event interfaces are versioned (v1, v2 folders)
- Context map is updated when:
  - A service introduces a new API or event stream
  - An integration style changes
  - A bounded context is refactored or merged

---

## 7. Maintenance

- Each service owns its side of the interface definition.
- Coordination required for upstream breaking changes.
- The CLI tooling (`tools/cli`) ensures registration of events, versioning, and interface exposure.
- Integration tests validate downstream contract adherence.

---

Would you like the diagram scaffolded or a visual example of the context map created next?
