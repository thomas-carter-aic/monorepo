Bounded Contexts

A Bounded Context defines the explicit boundaries within which 
a particular domain model is defined and applicable. Each service 
owns its model, logic, and data. Coordination between contexts 
happens through domain events, APIs, or message brokers.

Core Contexts

Context			Description

Auth			Identity, user accounts, permissions, and authentication flows.
Clients			Client company and user management, onboarding, provisioning.
AI Workspace		Management and execution of AI projects, models, datasets, and runs.
Billing			Subscriptions, payments, invoicing, and usage metering.
Templates		Reusable prompt, project, and model templates.
Projects		End-to-end tracking of client transformation projects and deliverables.
Engagements		Scoped consulting engagements, deliverables, approvals, and lifecycle.
Enablement		Enablement resources, documentation, training plans.
Notifications		Messaging, alerts, and in-app/email notifications.
Devtools		API tokens, webhook configuration, sandbox logs, and telemetry.
Support			Helpdesk, ticketing, chat, and knowledge base.
Marketplace		Vendor extensions, app submissions, integration listings.
Investor		Access to reports, KPIs, VDR, financials for shareholders.
Tenancy			Tenant isolation, account contexts, workspaces, subdomains.
IP Assets		Storage and lifecycle of client-specific and platform intellectual property.
