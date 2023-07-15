---
title: Data Fetching with React / TanStack Query
tags:
  - Tech
  - React
  - JavaScript
date: '2023-07-15T10:35:07.322Z'
---

[TanStack Query](https://tanstack.com/query/latest) (formerly React Query) is a delightful library for handling state around fetching data. If you're familiar with [Apollo Client](https://www.apollographql.com/docs/react/data/queries/) for GraphQL, but aren't using GraphQL in your app, TanStack Query gives you many of the same benefits:

- Data Caching
- Refetching at an interval
- Data Fetching State (such as `isLoading` or `error`)

If you're coming from a redux environment, much of the above was managed by hand. TanStack Query, however, takes care of the above automatically, while still exposing opportunities to make manual fetches when needed.

## Set Up

[The quick start in the official docs](https://tanstack.com/query/latest/docs/react/quick-start) should be enough to get you going.

The gist is you'll wrap your app in a QueryClient provider. Similar to the Redux provider, this will store your data at an application level.

```
import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import './custom.css';

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Routes>
          {AppRoutes.map((route, index) => {
            const { element, ...rest } = route;
            return <Route key={index} {...rest} element={element} />;
          })}
        </Routes>
      </Layout>
    </QueryClientProvider>
  );
};

export default App;
```

## Sending a Query

TanStack Query is not a replacement for `fetch`. Its focus is the state and caching of your data. So you'll still need to write a query function:

```
  const fetchBooks = async () => {
    const response = await fetch('book');
    const data = await response.json();
    return data;
  };
```

Once you have it, you'll pass it into the `useQuery` hook with a couple of options:

```
  const { data, isLoading } = useQuery({
    queryKey: ['books'],
    queryFn: fetchBooks,
  });

```

The `queryKey` is an array of values that will help keep your query labeled. This is helpful in the event you want to invalidate the query, essentially asking for another network request to be sent to update the data in the cache.

From the result, we're destructuring what we need: the `data` and the state `isLoading`.

`isLoading` can be used to show a loader to the user in your UI:

```
  return (
    <div>
      <h1 id="tableLabel">Books</h1>
      <p>This page demonstrates fetching data from the server.</p>
      <div>
        {isLoading ? (
          <p>
            <em>Loading...</em>
          </p>
        ) : (
          renderTable(data)
        )}
      </div>
    </div>
  );
```

`isLoading` pertains to the initial fetch. For the state of another query being sent, you'll want [to reach for `isFetching`](https://tanstack.com/query/v4/docs/react/reference/useIsFetching).

## Query With Filters

Sometimes you just need _one_ book. Query keys are commonly used for passing arguments to your fetch methods.

Here's the `useQuery` setup:

```
  const { data, isLoading } = useQuery({
    queryKey: ['books', { id }],
    queryFn: fetchBook,
  });
```

And here's how we access the arguments in the query function:

```
  const fetchBook = async ({ queryKey }) => {
    const [, { id }] = queryKey;
    const response = await fetch(`book/edit/${id}`);
    const data = await response.json();
    return data;
  };
```
