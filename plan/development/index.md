---
layout: main
title: Extending and modifying components in production
lead: What to do when you want to extend or modify a component in production.
main-container-style: 'ct-basic-content'
---

You might need to extend or modify components in the Design System from time to time. For example to:

-   improve them based on user research
-   meet a specific user need in your service

Consider whether your changes:

-   help the long term maintenance of your service
-   allow you to safely install updates from the Design System
-   reduce the risk of technical debt
-   continue to meet accessibility requirements

When you extend or modify components in the Design System you create potential risk. For example, your code or service may break when you install Design System updates, or you might make your service less accessible.

You can help reduce potential risk to your code by:

-   using [override classes]
-   not [overwriting Design System code]
-   using a [unique prefix for component names]
-   creating [custom override classes for multiple components]
-   using BEM for [small modifications to components]
-   forking components when you are making [large modifications]
-   [checking for accessibility] of modified components

The Design System team uses these techniques to make sure code does not unintentionally break other implementations.

## Start with override classes

Check the [styles section] to see if there's a CSS class you can use before adding CSS to your service.

For example, you can make changes to:

-   spacing with [spacing override classes]
-   font size with [font override classes]
-   width with [width override classes]

## Avoid overwriting Design System code


If you make a modification involving CSS you might decide to write a selector that targets a Design System class and change its CSS properties.

This will work in the short term but may break if you install an update relying on the component's previous behaviour.

For example, if you want to override the button component you could do the following.

```
<div class="app-interruption-card">
  <button class="dga-button">
    Inverse button
  </button>
</div>
```

```
.app-interruption-card .dga-button {
  color: dga-colour("blue");
  background-color: dga-colour("white");
}
```

This would work in the short term, but if the Design System changes how the button component works it could break when you update your service. For examples like this, consider using [small modifications to components].

## Use a unique prefix for component names

The GOV.UK Design System team uses prefixes, sometimes called [namespacing](https://techterms.com/definition/namespace), to make sure the code in the GOV.UK Design System does not unintentionally break your application code.

Styles, components and patterns in the GOV.UK Design System use the `dga-` prefix.

When writing code for a different application, use a different prefix, like `ddgs-`.

If your site has its own design resources, they should use a new separate prefix. It's a good idea to use departmental initials, like `buyict-` or `aga-`.

Apply this principle anywhere you name components, such as to:

-   CSS class names
-   Twig templates
-   SCSS variables and mixins

If you repurpose a component from another source to the Design System, change the component's prefix accordingly.

## Custom override classes


If you need to specify some custom override classes which do not belong to a particular component, you can define these using your [prefix] and the `-!-` convention from the GOV.UK Design System.

For example, to define a custom width for a specific reference number in your services you might do this.

```
.app-\!-reference-number-width {
  width: 10ch !important;
}
```

```
<span class="app-!-reference-number-width">
  7446868939
</span>
```

## Small modifications to components


The Design System uses a naming convention called [Block Element Modifier (BEM)](https://getbem.com/) which makes it easier to ensure styling is isolated to individual components. You can use this convention to make modifications to components.

When making small modifications to components you can make use of the [modifier convention from BEM](https://getbem.com/naming/), which uses a suffix of `--` plus a name, alongside your own [prefix].

For example, if you wanted to override the button component you could do the following.

```
<div class="app-interruption-card">
  <button class="dga-button app-button--inverse">
    Inverse button
  </button>
</div>
```

```
.app-dga--inverse {
  color: dga-colour("blue");
  background-color: dga-colour("white");
}
```

You should not use modifiers when:

-   you're modifying most of the component
-   the component does not meet the original user need
-   you need to make large changes to the HTML markup

## Large modifications to components

If you need to make a large modification to a component you should fork it entirely by copying and pasting the source code to create a new component.

When you do this you'll need to rename all [prefixes] that include `dga` to avoid conflicts. You should also use a different component name from those already in the Design System, to differentiate your unique component from a BEM modifier.

Doing this removes the possibility of any updates breaking your service. However, you will not receive any future updates from the original component.

For example, Gov.UK's [Step by step navigation pattern](https://design-system.service.gov.uk/patterns/step-by-step-navigation/) was a large modification of an existing component, which began as a small modification to the [Accordion component](https://design-system.service.gov.uk/components/accordion/). The step by step navigation had so many changes it was eventually forked into a separate component.

## Check for accessibility


Make sure any modified components meet accessibility standards. This is to ensure your service is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA standard](https://www.w3.org/TR/WCAG22/) and meets accessibility regulations.