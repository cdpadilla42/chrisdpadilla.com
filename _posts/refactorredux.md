---
title: Redux Growing Pains and React Query
tags:
  - Tech
  - React
date: '2022-10-13T05:35:07.322Z'
---

[AC: New Murder's](/acnm) announcement has been par for the course of a major release. Lots of good feedback and excitement, and some big bugs that can only be exposed out in the open.

The biggest one was a bit of a doozy. It's around how we're fetching data. The short version of an [already short overview](/acnmp) is this:

- Redux stores both Application State and Fetched Data
- Redux Thunks are used to asynchronously fetch data from our Sanity API
- We hope nothing goes wrong in between!

Naturally, something went wrong in between.

# Querying Sanity

Sanity uses a GraphQL-esque querying language, [GROQ](https://www.sanity.io/docs/groq), for data fetching. A request looks something like this:

```
`*[_type == 'animalImage']{
  name,
  "images": images[]{
    emotion->{emotion},
    "spriteUrl": sprite.asset->url
  }
}`

```

Similar to GraphQL, you can query specifically what you need in one request. For our purposes, we wanted to store data in different hierarchies, so a mega-long query wasn't ideal. Instead, we have several small queries by document type like the `animalImage` query above.

# The Issue

On app load, roughly 5 requests are sent to Sanity. If it's a certain page with dialogue, 5 additional requests will be sent.

The problem: Not every request returned correctly.

This started happening with our beta testers. Unfortunately, there's not a ton of data to go off of. From what we could tell, everyone had stable internet connections, used modern browsers, and weren't using any blocking plugins.

My theory is that some requests may not be fulfilled due to the high volume of requests at once. I doubt it's because Sanity couldn't handle our piddly 10 requests. More likely, there could be a request limit. Here, I'm still surprised it would be as low as 10 within a certain timeframe.

Whatever the cause, we had an issue where API requests were failing, and we did not have a great way of handling it.

# Contemplating Handling Errors

This project started 2 years ago when the trend for using Redux for all data storing was still pretty high. Things were starting to shift away as the project developed, but our architecture was already set.

There is potentially a Redux solution. Take a look at this Reducer:

```
function inventoryReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'GET_INVENTORY_ITEMS/fulfilled':
      return { ...state, items: payload };
   	...
```

The "/fulfilled" portion does imply that we do log actions of different states. We could handle the case if it returns a failure, or even write code if a "/pending" request hasn't returned after a certain amount of time. Maybe even, SAY, fetch three times, then error out.

But, after doing all that, I would have essentially written [React Query](https://tanstack.com/query/v4).

# Incorporating React Query

[It was time](https://youtu.be/gmS10ESpFwg). A major refactor needed to take place.

So, at the start, the app is using Redux to fetch and store API data.

React Query can do both. But, rewiring the entire app would have been time consuming.

So, at the risk of some redundancy, I've refactored the application to fetch data with React Query and then also store the data in Redux. I get to keep all the redux boilerplate and piping, and we get a sturdier data fetching process. Huzzah!

# Glueing React Query and Redux Together with Hooks

To make all of this happen, we need:

- A Redux action for storing the data
- A query method that wraps around our Sanity GROQ request
- A way of handling errors and missing data
- An easy way to call multiple queries at once

A tall order! We have to do this for 10 separate requests, after all.

After creating my actions, migrating GROQ into query methods, we need to make the glue.

I used a couple of hooks to make this happen.

```
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

export default function useQueryWithSaveToRedux(name, query, reduxAction) {
  const dispatch = useDispatch();

  const handleSanityFetchEffect = (data, error, loading, reduxAction) => {
    if (error) {
      throw new Error('Woops! Did not receive data from inventory', {
        data,
        error,
        loading,
        reduxAction,
      });
    }

    if (!loading && !data) {
      // handle missing data
      toast(
        "🚨 Hey! Something didn't load right. You might want to refresh the page!"
      );
    }

    if (data) {
      dispatch(reduxAction(data));
    }
  };
  const { data, isLoading, error } = useQuery(name, query);

  useEffect(() => {
    handleSanityFetchEffect(data, error, isLoading, reduxAction);
  }, [data, isLoading, error]);

  return { data, isLoading, error };
}


```

`useQueryWithSaveToRedux` takes in the query and redux action. We write out our `useQuery` hook, and as the `data`, `isLoading`, and `error` results are updated, we pass it to our handler to save the data. If something goes awry, we have a couple of ways of notifying the user.

These are then called within another hook - `useFetchAppLevelData`.

```
export default function useFetchAppLevelData() {
  const snotesQuery = useQueryWithSaveToRedux('sNotes', getSNotes, saveSNotes);
  const picturesQuery = useQueryWithSaveToRedux(
    'pictures',
    getPictures,
    savePictures
  );
  const spritesQuery = useQueryWithSaveToRedux(
    'sprites',
    getSprites,
    saveSprites

  ...

  return {
    snotesQuery,
    picturesQuery,
    spritesQuery,
    ...
  };
}


```

`useFetchAppLevelData ` is simply bringing all these hooks together so that I only need to call one hook in my component. It's mostly here to keep things tidy!

```
import useFetchAppLevelData from './hooks/useFetchAppLevelData';

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  const fetchAppLevelDataRes = useFetchAppLevelData();

  ...

}
```

A big task, but a full refactor complete!
