---
title: Extending Functionality Through the JS Proxy Class
tags:
  - Tech
  - JavaScript
  - TypeScript
date: '2025-05-27T17:29:30.322Z'
---

I came across the need for the [JS Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) class today!

I'll borrow MDN's example to show how it works:

```
const target = {
  message1: "hello",
  message2: "everyone",
};

const handler = {
  get(target, prop, receiver) {
    return "world";
  },
};

const proxy = new Proxy(target, handler);

console.log(proxy.message1); // world
console.log(proxy.message2); // world

```

A few cool ways that you can use this:

1. Extend the functionality of a class instance's methods.
2. Adding an extra level of validation for your arguments.
3. Serving as an intermediary between your application code and package.

In our case, we needed to make calls to a specific client safely by handling errors in a specific way. I'll show an abstract of how it was handled below:

```
import {RedisClientType} from "redis";
import {callSafely} from "#utils/callWithTimeout";

export class RedisClientWrapper {
    private redisClient: RedisClientType;

    constructor(redisClient: RedisClientType) {
        this.redisClient = redisClient;

        return new Proxy(this, {
            get: (target, prop) => {
                const originalMethod = target.redisClient[prop as keyof RedisClientType];
                if (typeof originalMethod === "function") {
                    return (...args: any[]) =>
                        callSafely(
                            () => (originalMethod as Function).apply(target.redisClient, args),
                        );
                }
                return originalMethod;
            },
        });
    }
}
```

Here, I'm using the Proxy as the return from my class definition. The get method is an object-level `get`, not an individual method. So, anytime an instance of `RedisClientWrapper` uses a function or tries to access a property, it will go through the `get` method I've defined.

Once called, we'll check to see if the attribute is a function, and if so, call that function safely. Otherwise, we'll return the original value from the `redisClient`.

Then, to use it, we just wrap up our client with `RedisClientWrapper`:

```
const wrappedClient = new RedisClientWrapper(newClient);

wrappedClient.get(key) // Key retrieved safely!

```