# Saga Patterns for Distributed Workflows

This document outlines the use of **sagas** in the AIC AI Platform architecture. Sagas manage distributed, long-running business transactions across multiple services, ensuring eventual consistency through orchestration or choreography.

---

## 1. What Is a Saga?

A **saga** is a sequence of local transactions. Each transaction updates data within a single service and publishes an event to trigger the next transaction. If a step fails, the saga executes compensating transactions to undo the previous steps.

---

## 2. When to Use Sagas

Sagas are appropriate when:

- Business processes span multiple services (e.g., onboarding a new client).
- Consistency must be maintained across services asynchronously.
- Operations need rollback or compensation on failure.

---

## 3. Saga Patterns

### 3.1 Choreography (Decentralized)

Each service listens for specific events and reacts accordingly.

**Pros**:
- Loosely coupled
- Simple to implement for simple flows

**Cons**:
- Harder to track/debug
- Risk of unexpected coupling over time

**Example**:

```plaintext
ClientOnboarded
  → Creates Workspace (ai-workspace)
      → Sets Up Billing Profile (billing)
          → Sends Welcome Notification (notifications)


Each service listens to events and reacts without a central coordinator.
3.2 Orchestration (Centralized)

A central saga orchestrator controls the flow and sends commands to participating services.

Pros:

    Explicit control

    Easier to test, monitor, and visualize

Cons:

    More tightly coupled

    Additional service to maintain

Example:

Saga Orchestrator: OnboardClientSaga
  → [Command] CreateWorkspace
  ← [Event] WorkspaceCreated
  → [Command] SetupBilling
  ← [Event] BillingProfileCreated
  → [Command] SendWelcomeEmail

4. Saga Lifecycle

    Triggering Event: A domain event (e.g., ClientOnboarded) starts the saga.

    Orchestration: Commands are dispatched sequentially or in parallel.

    Intermediate Events: Each command may emit events confirming success or failure.

    Compensation (optional): In case of failure, the saga initiates undo steps (e.g., RevertBilling).

    Completion: The saga ends in either a COMPLETED or FAILED state.

5. Saga Example: Client Onboarding
Trigger:

    ClientOnboarded (event from clients service)

Steps:
Step  Command Handler Service Success Event Failure Compensation
1 CreateWorkspace ai-workspace  WorkspaceCreated  DeleteTenant
2 SetupBilling  billing BillingProfileCreated DeleteWorkspace
3 SendWelcomeEmail  notifications NotificationSent  N/A
6. Saga Implementation Notes

    Sagas are stored in the services/<domain>/application/sagas/ folder.

    Use persistent state if saga spans time (e.g., DB or event store).

    Retry policy and idempotency must be enforced in each handler.

    CLI can scaffold new saga templates.

7. Sample Saga Skeleton

// services/clients/application/sagas/OnboardClientSaga.ts
import { Saga, SagaStep } from '@aic/core/saga';
import { CreateWorkspace, SetupBilling, SendWelcomeEmail } from '../commands';

export class OnboardClientSaga extends Saga {
  steps: SagaStep[] = [
    {
      command: new CreateWorkspace(),
      onSuccess: 'WorkspaceCreated',
      onFailure: 'RevertTenant',
    },
    {
      command: new SetupBilling(),
      onSuccess: 'BillingProfileCreated',
      onFailure: 'DeleteWorkspace',
    },
    {
      command: new SendWelcomeEmail(),
      onSuccess: 'NotificationSent',
    }
  ];
}

8. Monitoring & Observability

    All sagas should emit SagaStarted, SagaStepCompleted, SagaFailed, and SagaCompleted events.

    These can be used to drive dashboards and alerts.

9. CLI Support

Use the CLI to scaffold sagas:

pnpm scaffold saga OnboardClientSaga --service clients

10. References

    docs/architecture/events.md

    docs/architecture/context-maps.md

    packages/domain-events/clients/ClientOnboarded.ts

    services/<domain>/application/sagas/