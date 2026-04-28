---
title: Content standards
lead: Site-wide authoring standards for URLs, folder structure, and information architecture on digital.gov.au.
---

These standards apply across all content types on digital.gov.au. They cover the structural and governance decisions that sit above any individual page: how content is named, where it lives, and how users find it.

Follow these standards whenever you are creating a new page, restructuring a section, or reviewing existing content.

## URL and slug conventions

Use consistent, predictable URL patterns across comparable pages. Readers and search engines use URLs to infer context. Inconsistent or misleading slugs reduce trust and harm discoverability.

When setting a URL:

- Match the slug to the page title. If the page is titled 'Measuring success', the slug should be `measuring-success`, not `metrics` or `ms-guide`
- Use lowercase and hyphens. Do not use spaces, underscores, or special characters
- Keep slugs concise. Remove stop words (the, and, for, of) unless they are essential to meaning
- Check for typos before publishing. A slug with a spelling error cannot be corrected without a redirect
- Use the same naming pattern across comparable pages. If criteria pages are named `criterion-1`, `criterion-2`, all criteria pages in that section must follow the same pattern

Do not create slugs that are generic or shared across multiple content domains. A slug like `/guidance` or `/resources` provides no useful context and creates naming conflicts as the site grows.

## Folder structure and hierarchy

Use subdirectories consistently for comparable content groupings. The folder structure should reflect the information architecture visible in the navigation.

-   Group comparable content types in the same subdirectory. Do not publish checklists at the section root while placing all other resources in a `/resources` subfolder
-   Avoid double-parent structures. Do not place a child page in one folder while its landing page lives in a different folder at the same level
-   Align the folder path with the navigation label. If the navigation shows 'Compliance' as a child of 'Policy', the URL should reflect that relationship (`/policy/compliance/`), not flatten it (`/compliance/`)
-   Do not create one-off pages at the section root for content that belongs in a subfolder. A single page sitting outside its natural grouping is harder to find and harder to maintain

When restructuring a section, map the new folder structure to the navigation before publishing. Any mismatch between the URL path and the nav label will confuse readers and undermine search indexing.

## Redirect and URL hygiene

Outdated or broken URLs harm search rankings, mislead readers, and create dead ends for users arriving from bookmarks, emails, and external links.

Apply the following rules as part of any content review or restructure:

-   Redirect any URL that still receives traffic when its content is moved or retired. Do not leave the old URL returning a 404
-   Do not publish an archived page without either a redirect to current content or a clear archived notice with a link to the replacement
-   Review dead URLs as part of each section audit. Use analytics to identify pages receiving traffic but no longer linked from the site
-   Remove or redirect pages that were published under incorrect or provisional slugs. Do not leave both the old and new URL live without a canonical tag

If you are unsure whether a URL is still needed, check analytics before retiring it. A page with no inbound links and no traffic can be retired without a redirect. A page with measurable traffic needs a redirect regardless of whether it is linked from the site.

## Keeping content current

Content that references specific dates, implementation timelines, or policy versions will become outdated. Plan for this before publishing.

-   Remove or reframe content when all cited implementation dates have passed. A guide that says 'agencies must comply by 1 July 2023' does not help a reader in 2025
-   Review time-bound content as part of each section audit. Flag pages with dates in the past for update or retirement
-   Do not use dates in page titles or headings unless the content is intended as a dated record, such as a communique or annual report
-   If the content describes a timeline still in progress, verify dates are still accurate at each review cycle
