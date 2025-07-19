// packages/domain-events/index.ts

// Auth
export * from './auth/v1/UserRegistered';

// Billing
export * from './billing/v1/InvoiceGenerated';
export * from './billing/v1/PaymentReceived';

// Model
export * from './model/v1/ModelCreated';
export * from './model/v1/ModelExecutionStarted';
export * from './model/v1/ModelExecutionCompleted';

// Support
export * from './support/v1/SupportTicketOpened';
export * from './support/v1/SupportTicketResolved';

// Engagement
export * from './engagement/v1/EngagementCreated';
export * from './engagement/v1/EngagementCompleted';

// Templates
export * from './templates/v1/TemplatePublished';

// Notifications
export * from './notifications/v1/NotificationSent';

// Multitenancy
export * from './tenancy/v1/TenantProvisioned';

// API Keys
export * from './auth/v1/ApiKeyGenerated';

// Events related to developer integrations
export * from './devtools/v1/EventSubscriptionCreated';

// Auth
export * from './auth/v1/ApiKeyGenerated';

// Marketplace
export * from './marketplace/v1/AppInstalled';

// Clients
export * from './clients/v1/ClientOnboarded';

// Devtools
export * from './devtools/v1/EventSubscriptionCreated';
