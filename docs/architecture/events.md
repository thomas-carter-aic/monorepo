# Event Design Principles

## General Guidelines:

  - "Events are named in past tense using <Entity><VerbPastTense> format."
  - "Events should be factual, observable, and reflect a domain concept."
  - "Events are immutable."
  - "Use Zod for schema validation."

## Structure

// Example
```
export const ModelCreated = z.object({
  modelId: z.string().uuid(),
  createdBy: z.string().email(),
  timestamp: z.string().datetime(),
});

export type ModelCreated = z.infer<typeof ModelCreated>;
```

## Versioning

  - Events are stored in versioned folders: v1/, v2/, etc.
  - Major version changes (breaking) require new folders.

## Event Categories

Category		Description

Domain Events		Core changes in business state (e.g. ClientOnboarded, InvoicePaid)
Integration Events	External system notifications or sync points (e.g. ZendeskTicketSynced)
Lifecycle Events	Internal process and audit events (e.g. SagaCompleted, ProjectionRefreshed)

## Examples
```
// domain-events/billing/v1/InvoiceGenerated.ts
export const InvoiceGenerated = z.object({
  invoiceId: z.string(),
  tenantId: z.string(),
  amount: z.number(),
  issuedAt: z.string()
});

export type InvoiceGenerated = z.infer<typeof InvoiceGenerated>;
```


## Registration

  - All events are exported through packages/domain-events/index.ts
  - CLI auto-updates this index
