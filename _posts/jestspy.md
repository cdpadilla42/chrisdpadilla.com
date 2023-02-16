---
title: Spy Functions in Jest
tags:
  - Tech
  - React
  - Testing
date: '2023-02-15T10:35:07.322Z'
---

After sinking too much time wrestling with Jest configs, I decided I needed someone to walk me through the full scope of testing in JS and React. Scott Tolinski at Level Up Tutorials has a [great course on React Testing](https://levelup.video/tutorials/react-testing-for-beginners) that hits the goldilocks pacing here.

Going along, two different techniques to testing came up to broaden the palette: Spy Functions.

# Mechanical Testing

The first thing that comes to mind when writing tests is the mechanical approach. You run a function with some data, and then expect a certain result. The classic example:

```
test('Adds', () => {
	const res = add(1, 2);
	expect(res).toBe(3);
})
```

Say, though, that you're interested in a few details in between. For performance with React, in particular, I may be concerned with how many times this method is called in an integrated environment.

Enter Spying:

# Spying

```
test('Math', () => {
	const res = math(add, 1, 2);
	expect(math).toHaveBeenCalledTimes(1);
})
```

The above example is trite in Vanilla JS, but this demonstrates another dimension of assertion. There's an opportunity to verify that there are no odd bugs from multiple calls or any performance issues tied to is.

In a react context, there's a way to assert this with the help of [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/):

```
import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import Form from './Form';

afterEach(cleanup);

test('<Form />', () => {
  const onSubmit = jest.fn();
  const { debug, getByTestId, queryByTestId, getByText, container } = render(
    <MovieForm submitForm={onSubmit} />
  );
  const submitButton = getByText('Submit');

  fireEvent.click(submitButton);
  expect(onSubmit).toHaveBeenCalledTimes(1);
});

```

- `render` does just that, simulates the DOM tree of your component
- `cleanup` is being used to reset the component should we need to run other tests.
- Most notably, the `fireEvent` method does exactly what it says, and then we can run the same assertion to confirm it's only been run once.

[Kent C. Dodds would add](https://twitter.com/kentcdodds/status/1162098139609698304?lang=en) that in these cases, verifying the correct arguments are being passed adds security to the assertion:

```
fireEvent.click(submitButton);
expect(onSubmit).toHaveBeenCalledTimes(1);
expect(onSubmit).toHaveBeenCalledWith(add, 1, 2);

```

A helpful tool for sniffing out unexpected issues in an event driven environment! 🕵️‍♂️
