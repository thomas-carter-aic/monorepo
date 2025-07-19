# Generic Saga Skeleton

This pattern coordinates multiple distributed steps and 
maintains the consistency of workflows across services.

// root/services/<domain>/application/sagas/<SagaName>.ts
// Example: services/billing/application/sagas/ProvisionAndBillClientSaga.ts

```
import { DomainEvent } from '@domain-events';
import { publishEvent, subscribeToEvent } from '@event-bus';

export class ProvisionAndBillClientSaga {
  static start(event: DomainEvent) {
    // Start of saga
    subscribeToEvent('ClientProvisioned', async (payload) => {
      await publishEvent('BillingAccountCreated', {
        clientId: payload.clientId,
        plan: payload.plan,
      });
    });

    subscribeToEvent('BillingAccountCreated', async (payload) => {
      await publishEvent('WelcomeNotificationSent', {
        clientId: payload.clientId,
      });
    });
  }

  static compensate() {
    // Define compensation actions if something fails (optional)
  }
}
```
Sagas should be stateless where possible. Use a durable store or event store for tracking state if needed.
