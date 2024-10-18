---
title: Optimistic UI in Next.js with SWR
tags:
  - Tech
  - JavaScript
  - Next
  - React
date: '2024-10-18T10:35:07.322Z'
---

I remember the day I logged onto _ye olde facebook_ after a layout change. A few groans later, what really blew me away was the immediacy of my comments on friends' posts. I was used to having to wait for a page refresh, but not anymore! Once I hit submit, I could see my comment right on the page with no wait time.

That's the power of optimistic UI. Web applications maintain a high level of engagement and native feel by utilizing this pattern. While making an update to the page, the actual form submission is being sent off to the server in the background. Since this is more than likely going to succeed, it's safe to update the UI on the page.

There are a few libraries that make this process a breeze in React. One option is Vercel's [SWR](https://swr.vercel.app/), a React hook for data fetching. 

## Data Fetching

Say I have a component rendering data about several cats. At the top of my React component, I'll fetch the data with the `useSWR` hook:

```JavaScript
const {data, error, isLoading, mutate} = useSWR(['cats', queryArguments], () => fetchCats(args));
```

If your familiar with [TanStack Query](https://tanstack.com/query/latest) (formerly React Query), this will look very familiar. (See my previous post on [data fetching in React with TanStack Query](/tanstackquery) for a comparison.)

To the hook, we pass our key which will identify this result in the cache, then the function where we are fetching our data (a [server action](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations) in Next), and optionally some options (left out above.)

That returns to us our data from the fetch, errors if failed, and the current loading state. I'm also extracting a bound `mutate` method for when we want to revalidate the cache. We'll get to that in a moment.

## useSWRMutation

Now that we have data, let's modify it. Next, I'm going to make use of the `useSWRMutation` hook to create a method for changing our data:

```JavaScript
const {mutate: insertCatMutation} = useMutation([`cats`, queryArguments], () => fetchCats(args)), {
		optimisticData: [generateNewCat(), ...(data],
		rollbackOnError: true,
		revalidate: true
	});
```

Note that I'm using the same key to signal that this pertains to the same set of data in our cache. 

As you can see, we have an option that we can pass in for populating the cache with our optimistic data. Here, I've provided an array that manually adds the new item through the function `generateNewCat()`. This will add my new cat data to the front of the array and will show on the page immediately.

I can then use the `mutate` function in any of my handlers:

```JavaScript
const {error: insertError} = await insertCatMutation(generateNewCat());
```

## Bound Mutate Function

Another way of accomplishing this is with the `mutate` method that we get from `useSWR`. The main benefit is we now get to pass in options when calling the mutate method.


```JavaScript
const handleDeleteCat = async (id) => {
	try {
		// Call delete server action
		deleteCat({id});
		
		// Mutate the cache
		await mutate(() => fetchCats(queryArguments), {
			// We can also pass a function to `optimistiData`
			// removeCat will return the current cat data after removing the targeted cat data
			optimisticData: () => removeCat(id),
			rollbackOnError: true,
			revalidate: true
		})
	} catch (e) {
		// Here we'll want to manually handle errors
		handleError(e);
	}
}
```

This is advantageous in situations like deletion, where we want to sequentially pass in the current piece of data targeted for removal. That can then be passed both to our server action and updated optimistically through SWR.

For even more context on using optimistic UI, you can find a great example in [the SWR docs](https://swr.vercel.app/examples/optimistic-ui)