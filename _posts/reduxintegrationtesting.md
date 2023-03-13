---
title: Integration Testing with Redux
tags:
  - Tech
  - React
  - Testing
  - Redux
date: '2023-03-13T10:35:07.322Z'
---

I'm testing a form on an [e-commerce app](/tt). I've [already looked at](/implementationdetails) testing the components that add an item to the cart. Now I need to setup a test for updating an item in the cart.

My app leans on Redux to store the cart items locally. As per the [React Testing Library Guiding Principles](https://testing-library.com/docs/guiding-principles), I'm going to be asserting my app's functionality by checking what shows in the DOM against my expectations. Notably: I'm doing this instead of asserting the redux store state. I'll also be integrating a test store and provider in the mix.

The "how" today is Redux. The principle, though, is that if you're using a datastore, cache, or any other source, **you want to be integrating it in your tests and not simply mocking it**. That goes for either app state management or the data layer.

## Mocking

In my app, to accomplish this, I have to render the whole page with the Layout component included:

```
  const rendered = renderWithProviders(
    <Layout
      children={
        <CartItemPage
          item={chipsAndGuac}
          itemID={'5feb9e4a351036315ff4588a'}
          onSubmit={handleSubmit}
        />
      }
    />,
    { store }
  );
```

For my app, that lead to mocking _several_ packages. Here's the full list:

```
jest.mock('uuid', () => ({
  v4: () => '',
}));

jest.mock('next/router', () => {
  return {
    useRouter: () => ({
      query: {
        CartItemID: '5feb9e4a351036315ff4588z',
      },
      push: () => {},
      events: {
        on: () => {},
        off: () => {},
      },
    }),
  };
});

jest.mock('@apollo/client', () => ({
  useQuery: () => ({
    data: { itemById: { ...chipsAndGuac } },
  }),
  useLazyQuery: () => ['', {}],
  useMutation: () => ['', {}],
  gql: () => '',
}));

afterEach(() => {
  cleanup();
});

jest.mock(
  'next/link',
  () =>
    ({ children }) =>
      children
);`

```

I'm not testing any of the above, so I'm not sweating it too much. It did take some doing to get the right format for these, though.

## Redux Testing Utilities

You'll notice that my render method was actually `renderWithProviders`. That's a custom utility method. [The Redux docs outline how you can set this up in your own application here](https://redux.js.org/usage/writing-tests#setting-up-a-reusable-test-render-function).

That's it! _That's the magic sauce._ 🥫✨

The philosophy behind it is this: You don't need to test Redux. However, you do want to include Redux in your test so that you have greater confidence in your test. It more closely matches your actual environment.

You can take it a step further with how you load your initial state. You _could_ pass in a custom state to your `initStore()` call below. But, a more natural would be to fire dispatch calls with the values you're expecting from your user interactions.

Here I'm doing just that to load in my first cart item:

```
test('<CartItemPage />', async () => {
  const formExpectedValue = {
    cartItemId: '5feb9e4a351036315ff4588z',
    id: '5feb9e4a351036315ff4588a',
    image: '/guacamole-12.jpg',
    name: 'Guacamole & Chips',
    price: 200,
    quantity: 1,
    selectedOptions: {
      spice: 'Medium',
    },
  };

  const store = initStore();
  store.dispatch({
    type: 'ADD_TO_CART',
    payload: {
      ...formExpectedValue,
    },
  });

  . . .

}
```

From there, you're set to write your test. That's all we need to do with Redux, from here we'll verify the update is happening as it should by reading the values in the DOM after I click "Save Order Changes."

The details here aren't as important as the principles, but here is the full test in action:

```
test('<CartItemPage />', async () => {
  const formExpectedValue = {
    cartItemId: '5feb9e4a351036315ff4588z',
    id: '5feb9e4a351036315ff4588a',
    image: '/guacamole-12.jpg',
    name: 'Guacamole & Chips',
    price: 200,
    quantity: 1,
    selectedOptions: {
      spice: 'Medium',
    },
  };

  const handleSubmit = jest.fn();

  const store = initStore();
  store.dispatch({
    type: 'ADD_TO_CART',
    payload: {
      ...formExpectedValue,
    },
  });

  const rendered = renderWithProviders(
    <Layout
      children={
        <CartItemPage
          item={chipsAndGuac}
          itemID={'5feb9e4a351036315ff4588a'}
          onSubmit={handleSubmit}
        />
      }
    />,
    { store }
  );

  const pageTitleElm = await rendered.findByTestId('item-header');

  expect(pageTitleElm.innerHTML).toEqual('Guacamole &amp; Chips');

  const customizationSection = await rendered.findByTestId(
    'customization-section'
  );

  const sectionText = customizationSection.querySelector(
    '[data-testid="customization-heading"]'
  ).innerHTML;

  expect(sectionText).toEqual(chipsAndGuac.customizations[0].title);

  const spiceOptions = await rendered.findAllByTestId('option');
  const firstOption = spiceOptions[0];

  expect(!firstOption.className.includes('selected'));

  fireEvent.click(firstOption);

  const updateCartItemButtonElm = await rendered.findByTitle(
    'Save Order Changes'
  );

  expect(firstOption.className.includes('selected'));

  fireEvent.click(updateCartItemButtonElm);

  const cartItemRows = await rendered.findAllByTestId('cart-item-row');

  const firstItemElm = cartItemRows[0];

  const firstItemTitle = firstItemElm.querySelector(
    '[data-testid="cart-item-title"]'
  );
  const customizationElms = firstItemElm.querySelectorAll(
    '[data-testid="cart-item-customization"]'
  );

  expect(firstItemTitle.innerHTML).toEqual('1 Guacamole &amp; Chips');

  const expectedCustomizations = ['Mild'];

  expect(customizationElms.length).toEqual(expectedCustomizations.length);

  customizationElms.forEach((customizationElm, i) => {
    expect(customizationElm.innerHTML).toEqual(expectedCustomizations[i]);
  });
});

```
