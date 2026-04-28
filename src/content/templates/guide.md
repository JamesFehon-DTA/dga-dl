---
layout: content
title: 'Guide'
description: 'A guide provides instructional content that helps readers understand a framework, complete a process, or meet a policy requirement.'
url: '/'
---
## On this page
- When to use a guide
- Sizing your guide

Guides on digital.gov.au are primarily written for agency staff — including digital practitioners, policy officers, and senior responsible officials — who need clear, actionable direction for navigating digital investment, governance, and service delivery obligations.

A guide explains how to act, not just what is required. A guide explains steps to follow, considerations to weigh, and common scenarios to anticipate.

## When to use a guide

Use a guide when:
- a process involves multiple steps that readers must follow in sequence or with context
- readers need interpretive support to apply a policy or framework to their specific situation
- the content is long or complex enough to benefit from in-page navigation and structured sections

Do not publish content as a guide if it is a one-page checklist, a single summary fact, or a downloadable form. Those formats are better suited to a resource page.

## Sizing your guide

Guides on digital.gov.au fall into 3 size categories. Choosing the right size helps readers scan, navigate, and use your content efficiently.

**Long guides** are comprehensive frameworks or policy documents — typically 2,000 words or more across multiple structured sections. They require strong in-page navigation and a clear hierarchy. 
Use a long guide when the subject matter is complex, involves multiple roles or responsibilities, or spans a broad scope that cannot be meaningfully summarised.

**Medium guides** are process-heavy instructions or operational guidebooks — typically between 800 and 2,000 words. They walk readers through a defined set of steps and may include conditional paths or decision points. In-page navigation is optional but useful for guides at the upper end of this range.

**Short guides** provide quick-start direction or cover specific criteria — typically under 800 words. They are best for a single task or a tightly defined set of requirements. Avoid expanding a short guide with context that belongs in a related policy page or report.

## Structuring your guide

A well-structured guide follows this pattern:

1. **Introduction** — state who this guide is for and what it covers, and what readers will be able to do after reading it
2. **Context or background** — briefly explain why this guidance exists and where it sits within a broader framework, if relevant
3. **Main body** — use H2 headings to organise content by theme, stage, or role; use H3 subheadings for sub-steps or specific criteria
4. **Related resources** — link to the policy, supporting tools, and contact information

Keep each section focused. If a section covers more than one topic, consider whether it warrants its own page or a subpage structure.

Guides should not include the full text of the policy they support. Link to the policy instead, and use the guide to provide interpretation, worked examples, and procedural steps.

When publishing standards or criteria as a set of pages, do not organise the navigation as a linear sequence (Criterion 1 → Criterion 2 → Criterion 3). This is a page layout decision, not a reflection of the standard's logical structure. Readers often need to access one specific criterion without working through the full set. Use a link list or card grid so they can navigate directly to what they need.

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org">
  <!-- Background -->
  <rect width="800" height="450" fill="#f8f9fa" />
  
  <!-- Shared Styles -->
  <style>
    .title { font: bold 16px sans-serif; fill: #333; }
    .label { font: 12px sans-serif; fill: #555; }
    .tag-text { font: italic 10px monospace; fill: #666; }
    .border { stroke-width: 1; fill: #fff; stroke: #ccc; }
    .header { fill: #e3f2fd; stroke: #2196f3; }
    .nav { fill: #fff3e0; stroke: #ff9800; }
    .main { fill: #f1f8e9; stroke: #4caf50; }
    .footer { fill: #eeeeee; stroke: #9e9e9e; }
    .section { fill: #fff; stroke: #4caf50; stroke-dasharray: 4; }
  </style>

  <!-- 1. LONG GUIDE -->
  <g transform="translate(30, 50)">
    <text x="110" y="-15" text-anchor="middle" class="title">Long Guide (>2k words)</text>
    <rect width="220" height="340" class="border" rx="4" />
    
    <!-- Header -->
    <rect x="10" y="10" width="200" height="30" class="header" />
    <text x="110" y="28" text-anchor="middle" class="tag-text">&lt;header&gt;</text>
    
    <!-- Nav (Sidebar) -->
    <rect x="10" y="50" width="50" height="240" class="nav" />
    <text x="35" y="170" text-anchor="middle" class="tag-text" transform="rotate(-90 35 170)">&lt;nav&gt;</text>
    
    <!-- Main Content -->
    <rect x="70" y="50" width="140" height="240" class="main" />
    <text x="140" y="65" text-anchor="middle" class="tag-text">&lt;main&gt;</text>
    
    <!-- Sections -->
    <rect x="80" y="80" width="120" height="25" class="section" />
    <text x="140" y="96" text-anchor="middle" class="label">Intro</text>
    <rect x="80" y="115" width="120" height="25" class="section" />
    <text x="140" y="131" text-anchor="middle" class="label">Context</text>
    <rect x="80" y="150" width="120" height="50" class="section" />
    <text x="140" y="180" text-anchor="middle" class="label">H2 Sections</text>
    
    <!-- Footer -->
    <rect x="10" y="300" width="200" height="30" class="footer" />
    <text x="110" y="318" text-anchor="middle" class="tag-text">&lt;footer&gt;</text>
  </g>

  <!-- 2. MEDIUM GUIDE -->
  <g transform="translate(290, 50)">
    <text x="110" y="-15" text-anchor="middle" class="title">Medium (800-2k)</text>
    <rect width="220" height="340" class="border" rx="4" />
    
    <rect x="10" y="10" width="200" height="30" class="header" />
    <text x="110" y="28" text-anchor="middle" class="tag-text">&lt;header&gt;</text>
    
    <rect x="10" y="50" width="200" height="240" class="main" />
    <text x="110" y="65" text-anchor="middle" class="tag-text">&lt;main&gt;</text>
    
    <rect x="20" y="80" width="180" height="30" class="section" />
    <text x="110" y="100" text-anchor="middle" class="label">Introduction</text>
    <rect x="20" y="120" width="180" height="100" class="section" />
    <text x="110" y="175" text-anchor="middle" class="label">Step-by-Step (H2)</text>
    
    <rect x="10" y="300" width="200" height="30" class="footer" />
    <text x="110" y="318" text-anchor="middle" class="tag-text">&lt;footer&gt;</text>
  </g>

  <!-- 3. SHORT GUIDE -->
  <g transform="translate(550, 50)">
    <text x="110" y="-15" text-anchor="middle" class="title">Short (&lt;800 words)</text>
    <rect width="220" height="340" class="border" rx="4" />
    
    <rect x="10" y="10" width="200" height="30" class="header" />
    <text x="110" y="28" text-anchor="middle" class="tag-text">&lt;header&gt;</text>
    
    <rect x="10" y="50" width="200" height="240" class="main" />
    <text x="110" y="65" text-anchor="middle" class="tag-text">&lt;main&gt;</text>
    
    <rect x="20" y="80" width="180" height="60" class="section" />
    <text x="110" y="115" text-anchor="middle" class="label">Single Task</text>
    
    <rect x="10" y="300" width="200" height="30" class="footer" />
    <text x="110" y="318" text-anchor="middle" class="tag-text">&lt;footer&gt;</text>
  </g>
</svg>


## Writing conventions

Draft content for the web first, using HTML‑ready structures, rather than creating a PDF that later has to be adapted for online use.

Follow the [Australian Government Style Manual](https://www.stylemanual.gov.au) throughout. Key conventions for guides include:

- Use plain English and active voice. Write 'agencies must submit their DIP by 31 March' not 'DIP submission is required to have been completed by agencies prior to 31 March'
- Use sentence case for all headings
- Use numbered lists for steps that must be followed in order; use bullet lists for sets of items without a fixed sequence
- Spell out acronyms on first use, even if they are well known within government
- Avoid jargon and undefined technical terms; if a technical term is necessary, define it at first use or link to a glossary

## Building a guide page in the CMS

Use the following UI components when building guide pages in the CMS.

**Page header (hero)** — Use a simple title-and-description header without an image. The title should match the H1 and the navigation label. Keep the description under 25 words.

**In-page navigation** — Used on long and medium guides. This component generates an anchor-linked table of contents from the H2 headings on the page. Position it directly below the page header, before the first H2. Use with short guides where it helps the user - for example if your short guide has 4 or 5 H2s. See the [in-page navigation pattern](/patterns/in-page-navigation/) for full guidance.

**Text body** — The main content area. Use the full range of formatting options: headings, lists, tables and inline links. Use sub-headings and basic formatting to provide users with important information to reduce friction and keep flow for the reader. Users can miss important information when it is presented in UI block elements.

**Accordion** — Accordions hide content by default. Use them only for optional detail that readers can choose to skip, not for core guidance, standards criteria, or content readers need to cross-reference. Never nest accordions. If a page contains more than three accordions, restructure using H2/H3 headings instead, or split into sub-pages. Limit to five to seven items.

**Related content cards** — Add two to four cards at the bottom of the page linking to the relevant policy, related guides, and any associated forms or templates.

**Tags** — Apply content tags to support site-wide filtering (for example, 'investment', 'policy', 'assurance'). Tags should come from the approved taxonomy — do not create new tags without approval.

## Examples [to be reviewed]
### Long
- [Guidance for agencies and independent assurers: Assessing delivery confidence of digital projects](https://www.digital.gov.au/initiatives/digital-project-research-series/assessing-delivery-confidence-of-digital-projects)
- [Guidance for Senior Responsible Officials: Digital Project Governance Boards](https://www.digital.gov.au/initiatives/digital-project-research-series/digital-project-governance-boards-steering-success)
- [Digital Investment Plan (DIP) Policy](https://www.digital.gov.au/investment/strategic-planning/digital-investment-plans-dips/digital-investment-plan-policy)
- [Compliance, reporting and exemption guide](https://www.digital.gov.au/policy/digital-experience/compliance-reporting-and-exemption-guide)

### Medium
- [Digital Investment Plan (DIP) Guidebook](https://www.digital.gov.au/investment/strategic-planning/digital-investment-plans-dips/digital-investment-plan-dip-guidebook)

### Short
- [Benefits Management Policy Guidance](https://www.digital.gov.au/policy/benefits-management-policy/guidance)
- [Digital Experience Policy checklists](https://www.digital.gov.au/policy/digital-experience/toolkit/DXPolicychecklists)

## Sub-page variants

Some guides warrant one or more sub-pages beyond the main guide body. Use sub-page variants only when the content genuinely cannot be accommodated within the guide structure without disrupting flow or readability.

**Glossary** — a sub-page listing defined terms used across the guide; only warranted when the guide introduces 5 or more terms that cannot be defined inline. Link to it from the guide introduction. Do not duplicate definitions that exist in a related policy or report glossary.

**FAQ** — a sub-page for frequently asked questions; use only when questions cannot be addressed within the guide body without disrupting flow. Limit to 7 items. Position as the last sub-page in the guide structure.
