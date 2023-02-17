---
title: Testing Data Fetching Components + Other Jest Gotcha's
tags:
  - Tech
  - Testing
date: '2023-02-16T10:35:07.322Z'
---

# Testing Results of an API Call in React

While running an integration test on a React component, we don't need to test the API. _But_, we are typically interested in testing that our results are rendering appropriately in the component. Juggling this type of integration test takes a bit of setup an specific steps:

First, we need to mock the global fetch package. [Jest Fetch Mock](https://github.com/jefflau/jest-fetch-mock) handles this nicely for us. We can set that globally like so:

```
import React from 'react';
import { render, cleanup, waitForElement } from '@testing-library/react';
import MovieDetail from './MovieDetail';

global.fetch = require('jest-fetch-mock');
```

Within our test, we'll want to mock the call and return fake date:

```
test('<MovieDetail />', async () => {
  fetch.mockResponseOnce(
    JSON.stringify({
      id: 'hi',
      title: 'Cool Movie',
    })
  );

  ...

 }
```

Note the async! We'll need to await later within our function.

From there, we will need to wait for the effects to kick in from the API call and verify the DOM changed with the new data:

```
  const { debug, getByText, getByTestId } = render(<MovieDetail match={match} />);
  await waitForElement(getByText('Cool Movie'));
  expect(getByTestId('movie-title').textContent).toBe('Cool Movie');
```

I found on [Tania Rascia's post on testing](https://www.taniarascia.com/how-to-test-useeffect-api-call/) that there's a slick one-liner way to do this with `findBy`, which rolls `waitFor` and `getBy` into one assertion:

```
expect(await findByTestId('movie-title').textContent).toBe('Cool Movie');
```

Violà! Here's the full integration test:

```
import React from 'react';
import { render, cleanup, waitForElement } from '@testing-library/react';
import Film from './Film';

global.fetch = require('jest-fetch-mock');

test('<Film />', async () => {
 	fetch.mockResponseOnce(
		JSON.stringify({
 			id: 'hi',
			title: 'Cool Movie',
    })
  );

 	const { getByTestId } = render(<MovieDetail match={match} />);
	expect(await getByTestId('movie-title').textContent).toBe('Cool Movie');

 }
```

# Other Floating Notes

## Install types for that sweet, sweet autocomplete:

```
{
	 "devDependencies": {
	    "@testing-library/jest-dom": "^5.16.5",
	    "@types/jest": "^29.4.0",
	}
}
```

## Difference between `getBy` vs `queryBy`

**`queryBy`** It's a "Maybe." Maybe it exists, maybe it doesn't. `queryBy` will check if it's there or not. You can use `queryBy` to assess later if it's a good or bad thing that the element is or isn't there.

**`getBy`**, however, will strictly find an element and error out if it doesn't find the element, automatically failing your test.

## Code Coverage

```
$ jest --coverage
```

Generates a report that shows percentage of your codebase covered. The [general wisdom](https://kentcdodds.com/blog/how-to-know-what-to-test) is to not overly rely on this as your source of truth. You can have complete coverage with breaking tests, or even coverage with passing tests and a broken user experience.

## Testing A Component That Uses React Router

A common gotcha is working with React Router's `match` props that get passed into page-level components. If hitting errors when testing a component, the way through is 1. By using memory router and 2. by mocking your match object

```
import { MemoryRouter } from 'react-router-dom';

test('<Movie />', () => {
  render(
    <MemoryRouter>
      <Movie />
    </MemoryRouter>
  );
  // assert here
});
```

## Clearing your Mock calls

If running multiple tests in a suite and spying on mocked function calls, you may need to clean up the call counter after each test. Here's an example of resetting a `console.error` spy:

```

afterEach(() => {
  cleanup();
  console.error.mockClear();
});

console.error = jest.fn();

```

`cleanup();` is doing the same for React components - otherwise, state and props will linger from test to test.
