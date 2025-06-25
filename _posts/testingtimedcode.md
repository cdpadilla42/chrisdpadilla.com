---
title: Testing Time Interval Code
tags:
  - Tech
  - Testing
  - JavaScript
  - TypeScript
date: '2025-06-25T13:50:28.322Z'
---

Unit tests, as a rule, are meant to be quick to run. Part of their benefit is the ability to cover the entire codebase and give you feedback on its working status in a few seconds.

Let's look at an exception: Code that is timing sensitive.

In my case, I have a function that imitates throttling behavior. Meaning: the first call will set a timeout, subsequent calls will be gathered, and after the timeout, a merged result will be returned.

How would I test that functionality?

## An Aside

The way my function is gathering calls is trivial for today's topic. If you're curious: In my real-world case, I'm using an in-memory Redis server to store args passed to function calls. But I'll leave out the details. Let's get to the testing!

## Considerations

As mentioned, we want to keep the benefit of a tight iteration loop. Test runners may even limit the time a test can run. Bun, our test runner of choice today, errors if a test takes longer than 5 seconds.

To handle this, if the function tested typically has a timeout set for 60 seconds, we'll truncate it to 1 second for testing.

```TypeScript
export const getFunctionTimeout = () => {
    if (process.env.NODE_ENV === "test") return 1;
    const envValue = process.env.FUNCTION_TIMEOUT;
    if (envValue) return parseInt(envValue, 10);
};
```

Typically, we test multiple cases with multiple tests. A `describe` block will have separate `it` blocks, each test being decoupled from the others. If we are working with timeouts, however, writing multiple tests will dramatically increase the time it takes for our tests to complete if they run sequentially.

## Writing the Test

To simulate delayed function calls, I'm going to write a method that returns a promise that resolves based on the position in a list of arguments:

```TypeScript
const additionalMessageInterval = (getFunctionTimeout() * 1000) / 10;

const getStaggeredFunctionCalls = (argValues: ArgValues[]) =>
	    argValues.map((args, i) => {
	        return (async () => {
	            if (i) await wait(i * additionalMessageInterval);
	            // Call the function being tested.
	            await myThrottleFunction(args, callback);
	        })();
	    });

```

Note the `additionalMessageInterval`. Instead of hard-coding a number and coupling my tests, I'm making the interval dynamic based on the value returned by `getFunctionTimeout`.

Now, I'll generate those function calls and pass them into a `Promise.all` call:

```TypeScript
describe("myThrottleFunction", () => {
	it("should handle throttling args", async () => {
		const callback = mock((args: Args) => {});

		await Promise.all([
		    ...getStaggeredFunctionCalls(firstSetOfArgs),
		    ...getStaggeredFunctionCalls(secondSetOfArgs),
		]);
	}

	// . . .
}

```

After this, I can ascertain the behavior of my function. Here, I'll do so by checking if my callback was called the expected number of times:

```TypeScript
expect(callback).toHaveBeenCalledTimes(2);
expect(callback).toHaveBeenCalledWith(firstSetOfArgs);
expect(callback).toHaveBeenCalledWith(secondSetOfArgs);
```

Viola! By using a series of promises with timeouts, I've now simulated throttled behavior in my tests. From here, I can expand the test as needed to handle the unique behavior of my function.

Have a good _time_ playing with this!
