---
layout: content
title: 'Message'
description: 'A Message displays important notifications and alerts to users, clearly communicating the status, importance, and context of the information through distinct visual styling.'
component-type: Content
url: '/'
---

<p class="ct-text-large">{{ page.description }}</p>


Typically a Message should appear near the top of a page, under the H1 and introductory paragraph, following a submit action.


## Do
- keep Message content brief and to the point
- apply the correct message type (error, warning, success, information) based on the context and urgency of the information.
- place the Message component near the top of the page, under the H1 and introductory paragraph
- use constructive, no-blame language, avoid vague descriptions
- include clear instructions on what the user should do next or provide links to additional resources
- keep it short – content should be understood at a glance
- use the correct colour tone for the message (see tones below)

## Don’t

- insert a Message into a banner, instead position the page alert after the h1
repeat the title in the description
- if the Message title is enough to convey the message, a description may not be necessary
- use for common actions such as deleting an email or tasks where an action can be undone
- use for information unrelated which is not time-sensitive or does not require the user's immediate attention
- use in a form with only one input error - assign focus to the input where the error occurred
include a close button for error messages.


## Variations
### Message types
- Error: Used to indicate critical problems that prevent an action from completing successfully
- Warning: Used to alert users about potential issues that require attention but don't prevent actions
- Success: Used to confirm successful completion of an action or process
- Information: Used to provide non-critical updates or general information