---
title: What, Why, and How of Design Systems
tags:
  - Tech
  - Design Systems
date: '2023-01-11T10:35:07.322Z'
---

I'm involved in setting up a new design system on a project. From a high level, I've been taking a look at what that means in a React application.

Really quick, here's a succinct [definition](https://www.invisionapp.com/inside-design/guide-to-design-systems/): "A design system is a collection of reusable components, guided by clear standards, that can be assembled together to build any number of applications."

The aim of a design system is mainly to:

- Integrate code with design standards
- Bring brand cohesion to an app
- Eliminate decision fatigue from having to design on the fly

# There's A Spectrum

For most developers, the first thing that comes to mind would be [Bootstrap](https://getbootstrap.com/). You get an accordion, you get buttons, some basic layout components, and many other goodies. They integrate with React, or you can use plain HTML and CSS.

Bootstrap, however, is on a spectrum of design systems.

Chris Coyier demonstrates this pretty well through asking ["Who are design systems for?"](https://css-tricks.com/who-are-design-systems-for/). The extremes of the spectrum are based on customizabiliy, according to other, more famouse Chris:

> - Zero Customizability: We built this to strongly enforce consistency for ourselves.
> - Pre-Selected Variations: We’ve got accordions in three different colors.
> - BYO Theme: We’ll give you a skeleton that loosely achieves the pattern and you apply the styles to your liking.

Material UI by Google, for example, pretty rigidly feels like a Google product.

But then, you have the list of ["Classless CSS"](https://github.com/dbohdan/classless-css) files that just give you some basic stylings for the html elements. And those are a design system too.

Arguable, the browser defaults for html tags are a design system!

# Where To Go on the Spectrum

So how heavy handed a design system is depends on the project and team. And if you're developing your own, it's something that's developed organically over time.

A loose, light design system may need more rigidity as the team and app grow.

Even structurally, your design system will likely have a spectrum of component size. Spanning from Atomic elements to templates and pages, as [Brad Frost recommends](https://atomicdesign.bradfrost.com/chapter-1/).

But, likely at the start, a few CSS variables with semantic colors and sizing are a good place to begin.

# How To Use and Implement

Routes to take include off-the-shelf open source frameworks, customizing those as you go along, developing a component library — the options are plentiful, but many folks point to starting with a template and building from there.

Dave Rupert, deep in the trenches of design system implementation, actually brings up an interesting point about considering these design systems as ["Tools Not Rules."](https://daverupert.com/2020/01/the-web-is-industrialized-and-i-helped-industrialize-it/) As human beings, we want to stretch our design chops. If you're a front end focused dev, you likely get satisfaction from crafting the design yourself to some extent.

On a smaller project and a small team at the start, it's fairly easy to keep freedom within using a system, I believe.

At the end of the day, similar to a framework, it's meant to suit the user. Your team will decide the frameworks used, to what degree of customization, and even how technically proficient you need to be to use the system.
