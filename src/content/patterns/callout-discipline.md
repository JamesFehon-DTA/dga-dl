---
layout: content
title: 'Callout discipline'
description: 'Setting a budget for callouts on each page type so the most important sentence is unmissable.'
url: '/'
---

A callout works because it is the visually-strongest element on the page. Two callouts on a page compete with each other and the strongest one wins by default – usually the wrong one. This pattern sets a per-page-type budget so the callout always carries the sentence it needs to.

The [callout](/components/callout/) component itself is unchanged. What this pattern governs is editorial frequency – how often a callout appears on a given page type.

## Per-page-type budget

| Page type | Maximum callouts | What the callout carries |
|---|---|---|
| Rule page (criterion, statement) | One | The verbatim normative sentence |
| Standard parent | One | The single-sentence purpose statement of the standard |
| Guidance (how-to, explainer) | Two | One 'do this' callout, one 'avoid this' callout, in that order |
| Step in a framework | One | The gate condition – 'You can't proceed to step N until X is documented' |
| Case study | One | The 'best for' fit statement at the top |
| Report chapter | One | The chapter's headline finding, mid-chapter |
| Reference – glossary, checklist | Zero | Reference content stays open and uncalloused |
| Reference – FAQ | Zero or one | Optional: one callout above the accordion if 80%+ of readers need the same answer |
| Resource page | One | Important prerequisites or version notes |
| Section landing page | Zero | Routing pages do not need callouts |
| Communique | Zero | Communiques publish in full; promoting one decision over another is editorial |

## Why one callout on rule pages is non-negotiable

A rule page exists so that agencies can quote the rule in compliance reviews, audits, and tabled responses. The callout is the surface that gets quoted. A second callout next to the rule – even one labelled 'Tip' or 'See also' – competes for the reader's attention and creates ambiguity about which sentence is the source of truth.

This applies to every variant of rule page: criteria, statements, standard parents. See the [rule template](/templates/rule/) for the full pattern.

## Why guidance gets two callouts, not three

Two callouts on a guidance page – one positive, one negative – read as a deliberate editorial pair. A third callout breaks the pattern: readers stop reading them as exceptional and start scanning past them.

If a guidance page has more than two pieces of information that 'feel callout-worthy', restructure with H2 sub-sections instead. The information is not less important; it just no longer needs the visual lift to be found.

## Why reference pages get zero callouts (with one exception)

Reference content – glossaries, checklists, communiques – is read by lookup. A callout pulls the reader's eye away from the lookup target. A glossary with one term in a callout implies that term is more important than the others, which is rarely the editorial intent.

The exception is the FAQ. If a single question accounts for the bulk of reader traffic, lift its answer into a callout above the accordion. The accordion handles the long tail; the callout handles the dominant case. Do this only when there is real evidence – analytics or user research – not on a hunch.

## Where to put the callout

The position of the single callout matters as much as the count.

- **Rule page:** directly under the page header. The reader scrolls and immediately sees the rule.
- **Guidance:** the 'do this' callout above the body content; the 'avoid this' callout below the relevant section, not at the end.
- **Step in a framework:** at the bottom, immediately above [pagination](/patterns/pagination/) – the gate is the last thing the reader sees before deciding to move on.
- **Case study:** top of the body, before the narrative – it is the 'is this me?' filter.
- **Report chapter:** mid-chapter, breaking up long prose with the headline finding.

## Anti-patterns

**Callout used for an alert or error.** Use [Message](/components-advanced/message/) or the global alert. Callouts are for static editorial content, not system state.

**Callout used for a quotation in long-form content.** Use [Quote](/components/quote/) instead. The visual treatment is similar but the semantic meaning is different.

**Callout used for primary content.** If the content of the callout is the page's main argument, it is no longer a callout – move it into the body and use a callout for something genuinely supplementary.

**Callout used to hide complexity.** A callout flags one important sentence – it does not substitute for headings, lists, or sub-sections. If the page reads as a wall of prose, restructure the body before adding a callout.

## Related components

- [Callout](/components/callout/) – the component itself.
- [Quote](/components/quote/) – use for direct quotations, not editorial emphasis.

## Related patterns

- [Messaging](/patterns/messaging/) – for system state, error, and success notifications, not editorial emphasis.
