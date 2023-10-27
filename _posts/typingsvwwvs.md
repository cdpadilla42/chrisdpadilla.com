---
title: Typing — Strong vs Weak and Static vs Dynamic
tags:
  - Tech
  - Go
  - TypeScript
  - Python
date: '2023-10-26T10:35:07.322Z'
---

Two axis of typing, both with specific meanings:

## Static vs Dynamic

This dimension answers the question "are types checked at runtime or compile time?"

TypeScript, Go, and C# are languages that assert types at compile time. If there's a type error, your program simply won't compile (or transpile, in TypeScript's case.)

Dynamically typed languages are only asserted at runtime. With JavaScript, for example, you could ship code that will break due to a type mismatch, but may seem fine in the text editor. 

In **static** typed languages like TypeScript, Go, C#, Java, etc., a variable on declaration requires a type. Here's an example in each language:

```
let name : string = "Chris" // TypeScript
let name = "Chris" // TypeScript infers the string type

var tickets uint = 2 // Go
price := 3 // Go infers type with the shorthand

String city = "Dallas" // Java
string state = "Texas" // C#

```

In a case like this, I wouldn't be able to change any of the string variables to an int and vice versa. An error will occur at some point letting me know that I've passed an incorrect value to a variable.

So another way of looking at it is "do my variables hold the type or my values?" Though, we'll see exceptions to this in the next section.

In JavaScript, Ruby, and Python, the value maintains the type, not the variable. Here's an example in python:

```
favorite_pizza = "Cheese"
favorite_pizza = 100
```


## Strong vs Weak

This dimension is a bit more nuanced. In simple terms, this question answers "Can I work around those types?"

Here's a common example of weak typing in JavaScript:

```
// JavaScript
const a = 1;
const b = "1"
const c = a + b; // "11"
```

Python is considered strongly typed, but we don't declare our types. We can't, however, do the above JavaScript string and int addition.

In strongly type languages, conversions need to be explicit. You would need to write something like this to add a string and int:

```
1 + int("1")
```

So, Python is a dynamic, strongly typed language.

TypeScript is the opposite of Python. While being statically typed, it's still weakly typed, because JavaScript is weakly typed. This still runs without errors:

```
const a int = 1
const b string = '1'
console.log(a + b) // 11
```

That makes TypeScript a weak, statically language.