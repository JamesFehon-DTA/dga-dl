---
layout: content
title: 'Messaging'
description: 'Choosing between notification components based on scope, urgency, and whether the message is authored or system-generated.'
url: '/'
---

Four options are available for communicating notices, alerts, and feedback to users. This pattern helps you choose the right one based on message scope, urgency, and trigger.

Do not stack multiple notification types on the same page. Choose the one that best fits the message.

## Decision table

| | Inline body text | Callout | Message | Global alert |
| --- | --- | --- | --- | --- |
| Scope | Specific sentence or paragraph | Section or topic area | Page-level, near H1 | Entire site or service |
| Urgency | Informational | Informational, non-urgent | Contextual | High urgency |
| Triggered by | Author | Author | User action or system event | Administrator |
| Persists independently | Yes | Yes | No — responds to state | Yes (until removed) |

## Inline body text

Use inline text for information that is a natural part of the page flow. This is the default choice for informational content. Do not reach for a callout or message component unless the content genuinely needs to stand apart.

## Callout

Use a [Callout]({% link _components/callout.md %}) for static, non-urgent information that needs to be visually distinguished from surrounding body text. A callout is authored inline and does not respond to user action or system state.

**Use a callout when:**

- the information is important but not urgent
- the content needs to stand out from surrounding text
- the message is fixed — it does not change based on what the user does

**Do not use a callout for:**

- error messages or validation feedback — use a Message instead
- service-wide alerts — use a Global alert instead
- information that should only appear in response to a user action

## Message

Use a Message for system feedback that follows a user action — for example, confirming a submission, flagging a validation error, or warning that a session is expiring. Position it near the page H1.

**Use a message when:**

- the content is a direct response to something the user has just done
- the message is contextual to the current task
- the message may appear and disappear based on system state

**Do not use a message for:**

- general informational content — use body text or a callout instead
- site-wide communications — use a Global alert instead

## Global alert

Use a Global alert for the highest-urgency, site-wide information — for example, a service outage, a critical policy update with an imminent deadline, or a mandatory change affecting all users. It appears above the site header on every page.

**Use a global alert when:**

- the message is relevant to all or most users across the entire site
- the urgency is high enough to interrupt the normal reading experience
- the message has a defined start and end — remove it promptly once it is no longer current

**Do not use a global alert for:**

- page-specific information — use a callout or message instead
- content that is informational rather than urgent

## Related components

- [Callout]({% link _components/callout.md %}) — static, authored callout for non-urgent informational content.
