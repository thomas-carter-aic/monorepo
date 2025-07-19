# Integration Policy

This document defines the standard policies and guidelines for integrating between bounded contexts, services, and external systems within the AIC AI Platform. It ensures maintainability, autonomy, and resilience across the platform.

---

## 1. Purpose

To enforce a clear and consistent approach to:

- Inter-context communication
- Event publishing and consumption
- API design and usage
- Contract management and versioning

---

## 2. Guiding Principles

1. **Loose Coupling**: Services must be independently deployable.
2. **Explicit Contracts**: Every integration is governed by versioned, documented interfaces.
3. **Event First**: Prefer event-driven communication where possible.
4. **Backward Compatibility**: APIs and events must not introduce breaking changes without a formal deprecation process.
5. **Security by Default**: All interfaces must be authenticated and authorized.
6. **Autonomy First**: Services are allowed to diverge in implementation details as long as they meet contracts.

---

## 3. Integration Types

### 3.1 Event-Driven Integration

- Transport: NATS, Kafka
- Format: JSON with Zod validation
- Versioning: Event names are namespaced and versioned (e.g., `v1.UserRegistered`)
- Consumers must not assume delivery order or timing.

**Examples:**
- `ClientOnboarded` triggers `Billing` and `Support` workflows
- `ModelExecutionStarted` is published from `ai-workspace` to `projects` and `notifications`

### 3.2 REST APIs

- Used for synchronous interactions that require guaranteed request-response.
- Required headers: `Authorization: Bearer <token>`
- Must implement OpenAPI specs and input validation.

**Examples:**
- `projects` service calling `templates` for rendering templates
- `support` querying `clients` for account status

### 3.3 GraphQL (Federation)

- Used primarily in developer-facing portals.
- Contracts are composed and versioned via Apollo Federation or Mesh.

### 3.4 Internal Libraries (Shared Kernel)

- Used sparingly for:
  - Auth/token validation
  - Common types
  - Utility functions

---

## 4. Contract Management

| Policy                     | Rule                                                                 |
|---------------------------|----------------------------------------------------------------------|
| Event Contracts            | Must be defined in `packages/domain-events/<domain>/vN/`            |
| API Contracts              | Must have OpenAPI or GraphQL schema and validator (Zod, Yup)        |
| Breaking Changes           | Require ADR and 2-week deprecation window                           |
| Testing                    | All external-facing contracts must be covered by integration tests  |
| Auto-registration          | CLI (`tools/cli/generators`) must register new events/APIs          |
| Documentation              | All contracts documented in `docs/contracts/`                       |

---

## 5. Error Handling

- REST: Use structured error codes and `application/problem+json`
- Events: Include `correlationId`, `retryCount`, and `reason` fields for failures
- Timeout and retry logic must be built into all consumers

---

## 6. Integration Observability

- Every integration must:
  - Log event receipt and acknowledgment
  - Emit tracing spans via OpenTelemetry
  - Report to monitoring dashboards (e.g., Grafana, Datadog)

---

## 7. Third-Party Integration

- Must go through security review
- Must use internal proxy or API gateway
- Contracts must be wrapped with an anticorruption layer

---

## 8. Deprecation Policy

| Step        | Action                                  |
|-------------|------------------------------------------|
| 1. Notice   | Publish deprecation notice in changelog |
| 2. Schedule | Set removal date (min 2 weeks out)      |
| 3. Support  | Provide fallback or compatibility mode  |
| 4. Remove   | Delete old interface after migration     |

---

## 9. Compliance and Auditing

- All APIs and event streams are audited for:
  - Security headers
  - Schema validation
  - Auth enforcement
- Reports generated weekly for review by platform team

---

## 10. Change Governance

Changes to this policy must be:
- Proposed via ADR
- Reviewed by the Architecture Council
- Merged with a major version bump if contract-affecting

---

## 11. References

- `packages/domain-events/`
- `tools/cli/generators/`
- `docs/architecture/context-maps.md`
- `docs/contracts/`
