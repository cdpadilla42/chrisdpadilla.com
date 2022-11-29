---
title: Debouncing in React (& JS Functions as Objects)
tags:
  - Tech
  - React
  - JavaScript
date: '2022-11-29T05:35:07.322Z'
---

Debouncing take a bit of extra consideration in React. I had a few twists and turns this week working with them, so let's unpack how to handle them properly!

# Debouncing Function in Vanilla JS

[Lodash](https://lodash.com/docs) has a handy debounce method. Though, we could also just as simply write our own:

```
const debounce = (function, timeout) =>{
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { function(args); }, timeout);
  };
}
```

In essence, we ant to call a function only after a given cool down period determined by `timeout`.

Lodash comes with some nice methods for canceling and flushing your calls. They also handles edge cases very nicely, so I would recommend their method over writing your own.

```
const wave = () => console.log('👋');
const waveButChill = debounce(wave, 1000);
window.addEventListener('click', logButChill);

// CLICK 50 TIMES IN ONE SECOND

👋
```

With the above code, if I **TURBO CLICKED** 50 times per second, only one click event would fire after the 1 second cooldown period.

# React

Let's set the stage. Say we have an input with internal state and we want to send an API call after we stop typing. Here's what we'll start with:

```
import React, {useEffect} from 'react';
import {debounce} from 'lodash.debounce';

const Input = () => {
	const [value, setValue] = useState('');

	useEffect(() => {
		expensiveDataQuery(value);
	}, [value]);

	const expensiveDataQuery = () => {
		// get data
	};

	const handleChange = (e) => {
		setValue(e.currentTarget.value);
	};

	return (
		<input value={value} onChange={handleChange}/>
	);
};

export default Input;

```

Instead of fetching on submit, we're set to listen to each keystroke and send a new query each time. Even with a quick API call, that's not very efficient!

## Naive Approach

The naive approach to this would be to create our debounce as we did above in within the component, like so:

```
const Input = () => {
	const [value, setValue] = useState('');

	useEffect(() => {
		fetchButChill(value);
	}, [value]);

	const fetchButChill = debounce(expensiveDataQuery, 1000);

	. . .
}
```

What you'll notice though, is that you'll _still_ have a query sent for each keystroke.

The reason for this is that a new function is created on each component re-render. So our timeout method is never cleared out, but a new timeout method is created with each state update.

## useCallback

You have a couple of options to mitigate this: `useCallback`, `useRef`, and `useMemo`. All of these are ways of keeping reference between component re-rendering.

I'm partial to `useMemo`, though the react docs state that `useCallback` is essentially the same as writing `useMemo(() => fn, deps)`, so we'll go for the _slightly_ cleaner approach!

Let's swap out our fetchButChill with `useCallBack`

```
const Input = () => {
	const [value, setValue] = useState('');

	useEffect(() => {
		fetchButChill(value);
	}, [value]);

	const fetchButChill = useCallBack(debounce(expensiveDataQuery, 1000), []);

	. . .
};
```

Just like `useMemo`, we're passing in an empty array to `useCallback` to let it know that this should only memoize on component mount.

# Clearing after Unmount

An important edge case to consider is what happens if our debounce interval continues after the component has unmounted. To keep our app clean, we'll want a way to cancel the call!

This is why `lodash` is handy here. Our debounced function comes with method attached to the function!

**WHAAAAAAT**

A fun fact about JavaScript is that **functions are objects** under the hood, so you can store methods _on_ functions. That's exactly what Lodash has done, and it's why we can do this:

```
fetchButChill(value);
fetchButChill.cancel();
```

`fetchButChill.cancel();` will do just that, it will cancel out debounced functions before being called.

Let's finish this up by adding this within a `useEffect`!

```
const Input = () => {
	const [value, setValue] = useState('');

	useEffect(() => {
		fetchButChill(value);

		return () => fetchButChill.cancel();
	}, [value]);

	const fetchButChill = useCallBack(debounce(expensiveDataQuery, 1000), []);

	. . .
};
```
