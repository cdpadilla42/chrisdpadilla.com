---
title: Utility Classes in Bootstrap
tags:
  - Tech
date: '2023-07-21T10:35:07.322Z'
---

TIL that Bootstrap has a few utility classes for customizing beyond the basic styles.

This was a surprise to me! My experiences with [Bootstrap](https://getbootstrap.com/) has been to quickly put together prototypes and learning projects. So custom templating was not a high priority. Whatever came out of the box worked fine.

Though, in my current case, I had a situation where I wanted to adjust spacing. In [Tailwind](https://tailwindcss.com/) or a [CSS-in-JS](https://styled-components.com/) environment, granular updates are easy enough. But in my current project, I've _only_ been using bootstrap styles. So I was looking at a potential break in flow if I reached for another css library or fired up a css file _just_ for a few custom spacing classes.

Not the end of the world to go with those options, but it's handy to see that Bootstrap had me covered!

If you're familiar with Tailwind, these will look pretty familiar. Here's the example from [Bootstrap's docs](https://getbootstrap.com/docs/5.3/utilities/spacing/):

```
.mt-0 {
  margin-top: 0 !important;
}

.ms-1 {
  margin-left: ($spacer * .25) !important;
}

.px-2 {
  padding-left: ($spacer * .5) !important;
  padding-right: ($spacer * .5) !important;
}

.p-3 {
  padding: $spacer !important;
}
```

Actually, looking through the Utilities sections of the docs, there are several utility classes that I commonly reach for in tailwind:

- Background
- Borders
- Colors
- Display
- Opacity
- Position
- Sizing
- Vertical Align
- Z-Index

It doesn't cover the whole spectrum of CSS in the same way that Tailwind does, of course. Off the top of my head, I know that CSS transition properties are missing. Really, though, Tailwind is solving a different problem — atomic classes to reduce premature abstraction while still keeping a _highly_ flexible design system, whereas Bootstrap is a CSS framework.

I've largely stayed away from CSS frameworks in my personal projects. I'm comfortable with writing custom CSS, and I like the flexibility of writing by hand. I've been delightfully surprised with using Bootstrap lately, though. You could supplement any CSS library with utility classes through Tailwind or combine with custom CSS.

But, in cases where I want an all in one solution, I'll be keeping an eye out for libraries that expose their own utility classes.
