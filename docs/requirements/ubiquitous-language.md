# Ubiquitous Language

This document defines the core vocabulary used throughout the Applied Innovation Corporation (AIC) AI Platform, across domains, code, documentation, and conversations. This shared language ensures alignment between business, product, and engineering.

---

## 1. Core Domain Terms

| Term                     | Definition |
|--------------------------|------------|
| **Engagement**           | A consulting project or client-specific AI enablement initiative. |
| **Workspace**            | A client-specific sandboxed environment within the AI PaaS. |
| **Tenant**               | A company or organization using the platform as a client. |
| **Portal**               | A specific interface (e.g., Admin Portal, Developer Portal) tailored to a user role. |
| **App**                  | A client- or vendor-deployed integration, extension, or packaged AI module. |
| **Template**             | A reusable AI model or workflow blueprint that clients can instantiate. |
| **Assessment**           | An evaluation tool or checklist used by consultants to guide clients. |
| **Transformation Plan** | A roadmap or strategy tailored for client AI adoption. |

---

## 2. Event-Driven Terms

| Term                  | Definition |
|-----------------------|------------|
| **Domain Event**      | An immutable fact about something that happened within a bounded context (e.g., `UserRegistered`, `ModelCreated`). |
| **Command**           | A directive to perform an action (e.g., `CreateWorkspace`, `GenerateInvoice`). |
| **Query**             | A read-only request for information (e.g., `GetTenantUsageStats`). |
| **Saga**              | A long-running, coordinated business transaction across services. |
| **Policy**            | A rule that listens for events and may trigger actions or commands. |
| **Projection**        | A derived read model built by consuming events. |

---

## 3. User Roles

| Role           | Description |
|----------------|-------------|
| **Admin**      | Oversees all tenants, configurations, and system-wide settings. |
| **Consultant** | Delivers AI enablement services and manages client engagements. |
| **Client User**| Uses the platform on behalf of a tenant. May create workspaces, run models, view results. |
| **Developer**  | Builds apps, APIs, or integrations for use within the platform. |
| **Vendor**     | Provides marketplace-ready extensions and third-party solutions. |
| **Support**    | Responds to tickets and manages support knowledge base. |
| **Investor**   | Has restricted access to dashboards and financial reports. |

---

## 4. Data & Model Concepts

| Term              | Definition |
|-------------------|------------|
| **Model**         | A trained AI model that can be executed in a client workspace. |
| **Model Execution**| The act of running a model with input data, producing an output. |
| **Input Template** | A predefined schema guiding what data is required for model execution. |
| **Output Artifact**| A result produced by the platform — document, chart, recommendation, etc. |
| **Dataset**       | A collection of structured or unstructured data used for training or inference. |

---

## 5. Marketplace & Extensibility

| Term              | Definition |
|-------------------|------------|
| **Marketplace**   | A catalog of AI apps, templates, datasets, and vendor-provided tools. |
| **Extension**     | A plug-in to enhance or augment existing platform features. |
| **Integration**   | A connector or workflow with external systems (e.g., Salesforce, Databricks). |
| **Connector**     | A data pipeline or sync adapter that brings data into the platform. |

---

## 6. Access Control & Identity

| Term            | Definition |
|-----------------|------------|
| **API Key**     | Credential used to authenticate programmatic access. |
| **Session**     | A logged-in state for a user tied to a specific tenant and role. |
| **Permission**  | A granular action-level capability assigned to a role (e.g., `can_view_model`). |
| **Role**        | A bundle of permissions assigned to a user. |

---

## 7. Lifecycle Terminology

| Term              | Definition |
|-------------------|------------|
| **Onboarding**     | The initial setup process for new tenants, users, or developers. |
| **Provisioning**   | Allocating resources for a tenant, app, or workspace. |
| **Deactivation**   | Removing access or disabling an entity without deletion. |
| **Audit Log**      | An immutable log of sensitive or significant system activities. |

---

## 8. Platform & Operations

| Term              | Definition |
|-------------------|------------|
| **CLI Tooling**   | Developer-focused automation tools provided via terminal commands. |
| **Sandbox**       | An isolated, safe environment for testing APIs and app behavior. |
| **Telemetry**     | Logs, metrics, and traces emitted by services for observability. |
| **Secrets**       | Confidential credentials or configuration values encrypted at rest. |

---

## 9. Cross-Domain Language (Shared Kernel)

- **Event**: A named business fact.
- **Service**: A boundary around a subdomain (e.g., `billing`, `support`, `auth`).
- **Aggregate**: A transactional consistency boundary around domain entities.
- **Value Object**: An immutable object that expresses a concept (e.g., `Email`, `Price`).
- **Policy**: A reactive rule listening for events and enforcing invariants or coordination.
- **Read Model**: A materialized view created from events for querying purposes.

---

## References

- `docs/architecture/bounded-contexts.md`
- `docs/architecture/events.md`
- `docs/requirements/software-requirements-document.md`
