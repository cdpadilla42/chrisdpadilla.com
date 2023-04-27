---
title: Static Methods
tags:
  - Tech
  - C#
  - JavaScript
date: '2023-04-26T10:35:07.322Z'
---

In class driven languages like, say, C# — a way of storing utility methods is through a Static Method.

Say you're working in JavaScript. A great ol' example of this is the `Object.keys()` method.

`Objects` is the constructor. `keys` the static method.

(_technically_ not a class since JavaScript only mimics classes. More details on that in [You Don't Know JS by Kyle Simpson and contributors](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/objects-classes/ch3.md).)

In JavaScript, you can access the method on the constructor through dot notation. _But_ when creating an object, that object doesn't have a keys method.

```
const pizzaData = new Object();

Object.keys(pizzaData) // √

pizzaData.keys // X

```

The benefits?

Largely memory and data size. Not every object needs to recreate the method for each instance. We really only need _one_ source of truth for a utility method like this.

Not all that different from abstracting a handler in React components. Does each input component need to have its own `onChange` method instantiated with the component? Or can the same method be passed down from a parent prop.

So a pattern for working with static methods could be:

- If you need a method that can access the data directly on an instance? Store the method with the instance.
- If need something that converts data from an instance, or is largely utilitarian in function, a static method could be a good option.
