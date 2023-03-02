---
title: Testing Encourages Refactoring
tags:
  - Tech
  - Testing
date: '2023-03-02T10:35:07.322Z'
---

I came across hard evidence that [testing leads to well designed code](/testingandwriting) this week. Taking the time to test old code is helping me [decouple my JavaScript](/testingorganizescode)!

I'm using a [NextJS E-commerce site](/tt) as a playground for practicing writing tests. On the site, I have an item order page for each item on a menu. On the page, you can customize the item, select quantity, and then add them to your cart.

The component tree structure looks something like this:

```
<ItemDisplayPage>
	<CartItemForm>
		<CustomizationDisplay>
		<AddItemToCart>
			<ButtonWithPrice />

		...

```

`ItemDisplayPage` is the page level component, and `ButtonWithPrice` is the lowest child in this form. Everything else in between handles a spectrum of logic relating to the form.

## The Rookie Mistake

This app is a 2-year old project, a portfolio piece written before I was full time in software. So there were some odd design choices.

This is the big one: My `onSubmit` function was in `<ButtonWithPrice/>`. **Yikes!**

```
  const handleSubmit = (values) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        ...values,
      },
    });

    router.push('/');
  };
```

It's doable because, with hooks and global state, I can make that call all the way from the button and it is technically possible.

That very much tightly couples my form logic with the submit button. The button should really only be concerned with rendering price, adjusting quantity, and then firing the `handleSubmit` method — NOT declaring it, though.

## Testing Encourages Refactoring

At the time, it was no big deal. The app worked, tangled as it may have been!

When it came to testing the code, though, doing so was challenging.

I wanted to write an integration test the verifies that, on submit and after some interaction, I'm getting the right data saved to my Redux store. I want to do this from `CartItemForm` since that's a logical container for all of the interactions and form submission.

Here's a sketch of what that test looked like:

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

The gist:

1. I'm rendering `CartItemForm` with React Testing Library
2. I'm simulating user interaction by selecting a spice level in the form.
3. I'm clicking the submit button
4. I'm asserting if handleSubmit has been called and if it has certain values.

With this test written, here's the problem - how do I mock handleSubmit and read the values? I simply can't with the way my component is structured!! I can't drill down and mock from this level. Even if I rendered my button component, the submit method is still within the component and not easily reachable. It has to be extracted in some way.

So, ultimately I moved the `handleSubmit` declaration up to `ItemDisplayPage` and prop drilled from there.

That allowed me to mock and pass the mocked `handleSubmit` method this way:

```
  const handleSubmit = jest.fn();

  const rendered = render(
    <CartItemForm
      item={chipsAndGuac}
      itemID={'5feb9e4a351036315ff4588a'}
      onSubmit={handleSubmit}
    />
  );
```

What do I have as a result now?

- A passing test ✅
- More flexible, organized code ✅
- **Bonus:** I can more confidently refactor later, knowing I have tests in place 💯

I can see why there are cultures around testing first. WHen using libraries that fall on the spectrum of being opinionated, it guides your code to being more resilient. The upfront cost of setup is paid off in the long run with easily changeable code.
