---
title: Where Does Tailwind Fit In Your App?
tags:
  - Tech
  - Design Systems
date: '2023-01-12T10:35:07.322Z'
---

If you follow [Brad Frost's brilliant atomic model for design systems](https://bradfrost.com/blog/post/atomic-web-design/), Tailwind is at the atomic level.

Tailwind is such an interesting paradigm shift from the typical approach to CSS. I'm still early into it, but I can say I'm starting to see where it shines.

We're in a prototyping phase of implementing a new design system. We're reaching for tailwind to streamline a landing page design and simultaneously flesh out the reusable points of our system — fonts, color, spacing, and the like.

We're bringing this in, though, to a full blown full stack application that's already using styled components for one portion and SCSS for another.

So that's where the question comes from - among all that, where does Tailwind fit? What problem is it really solving?

# Tailwind Pros

Once you get past the funny approach to using it, here are the pros, some pulled from [Tailwind's docs](https://tailwindcss.com/docs/utility-first):

- When using semantic classnames, you are tightly coupling your css with the html structure of your element. The BEM system makes refactoring difficult.
- Naming things is one of the hardest parts of software. Here, you're not naming anything! You're simply styling with utility classes.
- Cascading styles as well as adjusting classnames can add to your css. With tailwind, you're using utility classes to apply the same styles with minimal customization. That makes the css more maintainable
- Similarly, codebases gets bloated with css doing the exact same thing. my `input__wrapper` may be doing the same positioning as my `button__wrapper` class.
- Colocating CSS and HTML (and JS if using React, Vue, etc.), but without the [performance hit](https://dev.to/srmagura/why-were-breaking-up-wiht-css-in-js-4g9b).

Not to mention, of course, that just like CSS custom properties, it's a way of working within a design system. Once you have your customizations set, spacing, colors, and breakpoints are all baked in to these utility classes.

One nice feature that's not mentioned right out the gate is that you can inline your psuedo-classes, as well. Here's an example from the docs:

```
<button class="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 ...">
  Save changes
</button>
```

# It's Atomic, not Molecular

Early on, we came across this issue:

```
  <div class="mt-3 flex -space-x-2 overflow-hidden">
    <img class="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
    <img class="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
    <img class="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" alt=""/>
    <img class="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
    <img class="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
  </div>
```

Lots of repeating styles. I assumed there would be a way to component-ise this through Tailwind. They provide it as an option through the `@apply` [directive on a custom class](https://tailwindcss.com/docs/functions-and-directives). However, it's largely not recommended to do this.

The docs argue that "Hey, this is what React is for!"

So there's a clear delineation from Tailwind fitting anywhere higher than the atomic level - higher than a button or input field.

Tailwind is a powerful design system tool that's serving that very particular, atom-level purpose in your application. Taking the "low level" css writing to a greater abstraction, and solving the same co-location problem that CSS-in-JS solves.

We may end up dropping Tailwind from our project in favor of making our own custom classes, but I'll be interested to try Tailwind out a bit more in personal projects.
