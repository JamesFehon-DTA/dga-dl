---
layout: content
title: 'Report'
description: 'Reports have conventions relating to their structure and formatting'
url: '/'
---

{::options parse_block_html="true" /}


## Purpose

A report presents the findings, analysis, or evaluation of a specific inquiry, project, program, or policy area. Reports on digital.gov.au are typically authored or commissioned by the DTA and represent a formal record of evidence and recommendations for government decision-makers, agencies, and the public.

Reports differ from guides in that they describe what was found, not what to do. They are evidence-first documents, and their authority derives from the rigour of their methodology and the credibility of their source data.

Use a report when:
- the content presents the results of an evaluation, review, trial, or research process
- the findings are intended to inform decision-making by agencies, ministers, or the public
- the content may be referenced as a formal government record over time

Reports may exist as a single page (summary) or as a multi-page publication with a landing page, body sections, and appendices. When a report is tabled in parliament, it must follow the full structural requirements set out in the Australian Government Style Manual.

## Sizing your report

**Long-form reports** are comprehensive publications — typically structured as multi-page sites with a foreword, methodology, findings sections, and appendices. They require a dedicated landing page that introduces the report and links to each chapter. Navigation between sections should be explicit and persistent.

**Short-form reports and summaries** present key findings in a condensed format — typically a single page or two to three short sections. They are designed for readers who need the headline findings without the full detail. A short-form report should always link to the full report where one exists.

## Writing conventions

Follow the [Australian Government Style Manual](https://www.stylemanual.gov.au) throughout. Key conventions for reports include:

- Use past tense for findings: 'the evaluation found', 'agencies reported', 'the data showed'
- Present recommendations in the active voice: 'agencies should adopt', not 'it is recommended that agencies consider adopting'
- Use numbered headings for multi-chapter reports to make cross-referencing straightforward
- Tables and figures must have a title and a source citation
- Avoid editorialising findings — present evidence clearly and let recommendations carry the judgment

## Web UI components

Use the following UI components when building report pages in the CMS.

**Page header (hero)** — For the landing page, use the full-width hero with the report title, a one-sentence description, and the publication date. Include a download link to the PDF version if one exists.

**In-page navigation** — Essential for long-form reports. Enables readers to jump between sections without scrolling. Enable on all body pages, not just the landing page.

**Rich text body** — The main content area. Use blockquotes for key findings or important direct quotations. Use tables for structured comparative data.

**Data visualisation** — Charts and graphs should be inserted as images with appropriate alt text. Where interactive data is available, use an embedded iframe or the relevant integration component.

**Pull quote** — Use for a single high-impact finding or a key quotation from the report. Position mid-page to break up long sections of text. Limit to one per section.

**File download** — Use the file download component (not a plain hyperlink) for the PDF version of the report. Display the file name, format, and file size.

**Accordion** — Use only for supporting reference material that is not part of the main report narrative, such as methodology notes or reference lists. Never use accordions for core findings or recommendations. Never nest accordions. Limit to five to seven items.

**Related content cards** — At the bottom of the landing page, link to related reports, the relevant policy area, and any program pages associated with the findings. Two to four cards.

**Tags** — Apply tags from the approved taxonomy. Reports typically carry tags for the policy domain, the publication type, and the year of publication.

## Style Manual guidance


> Create complete reports with a landing page, preliminary content, body and endmatter. Include other parts if the report needs to be tabled in parliament.
> <cite>
[Reports \| Australian Government Style Manual](https://www.stylemanual.gov.au/content-types/reports) 
</cite>

# Structure
```
Introduction
Section A
├── Item A1
│   ├── Subitem A1.1
│   └── Subitem A1.2
└── Item A2
    ├── Subitem A2.1
    └── Subitem A2.2
Section B
├── Item B1
└── Item B2
Appendices
├── Appendix 1
├── Appendix 2
└── Appendix 3
```


## Examples 
- Long form
  - [Major Digital Projects Report](https://www.digital.gov.au/initiatives/MDPR/foreword)
  - [Microsoft 365 Copilot: Full report](https://www.digital.gov.au/initiatives/copilot-trial/microsoft-365-copilot-evaluation-report-full)
  - [Strategic review of whole-of-government single seller arrangements](https://www.digital.gov.au/ssa/strategic-review-whole-australian-government-single-seller-arrangements-international-comparisons)
- Short form
  - [Microsoft 365 Copilot: Summary of evaluation findings](https://www.digital.gov.au/initiatives/copilot-trial/summary-evaluation-findings)
  - [Australian Government AI Assurance Framework: Pilot Report Summary](https://www.digital.gov.au/policy/ai/ai-assurance-framework-pilot-report/context-data-rationale)
  - [Observatory news and updates](https://www.digital.gov.au/initiatives/observatory/observatory-news)

## Sub-page variants

Reports with broad scope or a large volume of supporting material may include sub-pages beyond the main body. Use sub-page variants to maintain a clear separation between primary content and supplementary material.

**Glossary** — a sub-page listing defined terms; required for long-form reports, optional for short-form. Position as the first appendix or as a named sub-page before appendices. Do not duplicate a glossary that exists on a parent section landing page.

**Appendix** — one or more sub-pages containing supporting data, methodology, stakeholder lists, or reference material that would interrupt the report body. Each appendix must be numbered and titled. Link to all appendices from the report landing page.


