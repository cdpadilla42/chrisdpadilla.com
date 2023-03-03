---
title: Testing and Implementation Details
tags:
  - Tech
  - Testing
date: '2023-03-03T10:35:07.322Z'
---

[Redux casts it's vote for the methodology behind React Testing Library](https://redux.js.org/usage/writing-tests).

A key paradigm of React Testing Library is to avoid testing implementation details.

The reason being your users are namely concerned with the app behaving as they expect.

In react, that means not necessarily writing tests that your redux store is what you expect it to be. Instead, it's testing that information is rendering on the page correctly.

I can see the reason why. Implementation details change. Especially in modular systems. We should be able to swap redux out with a means of stage management without having to throw out or refactor our tests. That's twice the refactoring work when all we're concerned about is the app performing as it should be.

At the end of the day, that's more [orthogonal](/pragmaticprogramer).

## Implementation Details Are Relative

My example from [last time where I'm refactoring my form to elevate a handleSubmit method](/testingandrefactoring) comes close to being overly concerned with implementation details. As a reminder, here's what that test looked like:

```
/**
 * @jest-environment jsdom
 */
import React from 'react';
import * as reactRedux from 'react-redux';
import { render, cleanup, waitFor, fireEvent } from '@testing-library/react';
import CartItemForm from '../components/CartItemForm';

test('<CartItemForm />', async () => {
    const rendered = render(
    <CartItemForm
      item={chipsAndGuac}
      itemID={'5feb9e4a351036315ff4588a'}
    />
  );

    ...

  const spiceOptions = await rendered.findAllByTestId('option');
  const firstOption = spiceOptions[0];

  fireEvent.click(firstOption);

  const addItemButtonElm = await rendered.findByTestId('add-item');

  expect(addItemButtonElm.className.includes('selected'));

  fireEvent.click(addItemButtonElm);

  expect(handleSubmit).toBeCalledTimes(1);
  expect(handleSubmit).toBeCalledWith(formExpectedValue);

}
```

I would argue that this is not necessarily too concerned with implementation details, since the result from a form is a fairly important juncture in the flow of this app. AND I'm not really testing redux here. I'm simply verifying that our `onSubmit` is getting the information I expect.

However, this integration test _is_ lower on the value scale compared to one where I'm also checking to see if the cart is rendering the correct data afterwards. And that is much closer to what the user is expecting.

Even so, I'm in the clear - if I swap `dispatch` for an external api, no big deal. I still want to verify that it's getting passed the information I expect. If we swapped the form for a different layout, that's another component entirely, and we wouldn't be able to avoid reworking tests in that case anyway.

## A Higher Level of Abstraction

So that's one level of implementation details being disregarded. What about a level higher?

For this app, there's a higher level of abstraction. When it comes to properly updating an item in the cart, **then** it's important to pull further away from implementation details.

Here my logic is in the redux store, but I don't want to verify the values in the store. That's an implementation detail. I want to verify with what's rendering on the user's cart display is correct.

It's a surprisingly nuanced methodology. I can see why integration testing is a broad portion of the testing spectrum. An appropriate integration test from my last post would not be the same level of abstracted integration test as today's example. _And_ I can see how it's a sweet spot in validating the security of your app. It's the most flexible type of test to give high levels of confidence in different applications and scenarios.

## The Sweet Spot

I like to interpret that this is why the "integration part of [Kent C. Dodd's testing trophy](https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications) slopes. The higher up an integration is, the more likely that test will stick around as you swap implementation details, and the closer it is to what the user experience. Therefor, the more useful your test is as a tool for building confidence in the stability of your app.

In my mind, this doesn't negate the benefit of writing tests that are lower on the spectrum. Even unit testing, as a [tool for writing modular code](/testingorganizescode), is a pretty sound one.

But it checks out — integration tests sit in the sweet spot.
