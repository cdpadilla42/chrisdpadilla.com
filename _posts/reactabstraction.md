---
title: Abstraction between React Components
tags:
  - Tech
  - React
  - JavaScript
date: '2024-04-05T10:35:07.322Z'
---

As Jamison Dance put it in [this week's episode of the Soft Skills Engineering podcast](https://softskills.audio/2024/04/01/episode-402-it's-all-on-fire-and-title-inflation/): "It takes just _one more_ level of abstraction to be a great engineer!" 

A task at work this week had me looking to decouple one of our components that uses a third party library. Let's say it's a bar graph that uses something like Chartist.js. We want to be able to reuse this chart in both full page settings as well as where it's a widget inserted into  a page. In one case, clicking a bar would open a tooltip. In another, it may link to another page.

Normally, here are my considerations for doing that:

1. From the base component, elevate as much of the logic as possible. The child should essentially be a "view" component only concerned with rendering data.
2. Pass any interactivity down through callbacks such as "onClick", "onMouseEnter", etc.

That works fine in this example below:

```
const BarGraphContainer = (props) => {
	const dispatch = useDispatch();

	const onClickBar = (segment) => {
		dispatch(actions.openModal(segment));
	};

	return (
		<BarGraph
			onClickBar={onClickBar}
		/>
	);
};
```

## The Problem

In this instance, the base component is handling a third party library for initialization, setup, and much of the internal interactions. In some cases, I want to control firing off an event in that internal library (ex: opening a tool tip on click). But in other cases, I want an external behavior (linking away or opening a modal.)

## Passing Context Up Stream

An interesting solution I came up with was one that I had seen in other libraries and ecosystems: Passing context to the callback.

When considering passing callbacks in react, a simple use case typically only passes an event object.

```
const onClick (e) => e.preventDefault();
```

However, if I need access to the internal API of our third party library, I can pass that up through the callback as well. Even batter, I can abstract most of the internal workings of the library with a wrapper function. Take a look at the example:


```
const BarWidgetContainer = (props) => {
	const onClickBar = (segment, graphContext) => {
		graphContext.renderToolTip(segment);
	};

	return (
		<BarGraph
			onClickBar={onClickBar}
		/>
	);
};
```

Here, the `renderToolTip` function likely has a great deal of logic specific to the library I'm interfacing with. At a higher level, though, I don't have to worry about that at all. I can simply call for that functionality if needed from a level of abstraction.

## Use Cases

As mentioned, the abstraction is great for providing flexibility without complexity. Consumers of the component can interface with the internals without getting into the weeds of it. 

A major con, though, is the added decoupling. In most cases, this could be seen as an anti-pattern in React given the uni-directional flow that's preferred in the ecosystem.

Considering these points, we ultimate decided on another solution that allowed for the parent to child data flow. It makes the most sense for our situation since it keeps our code cleaner. Realistically, we're also only using this component in a hand full of use cases.

But why did I write this up, then? I'm keeping the pattern in my back pocket. Situations where I can see this being useful are in broader use cases. Say that instead of our internal React component, this were part of a larger library consumed by more users. The trade off of coupling for abstraction and flexibility might make sense in a more widely used library. That's likely why it's a frequent pattern in open source tools, after all.

It was a fun experiment this week! Saving this pattern for another time.

