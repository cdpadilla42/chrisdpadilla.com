---
title: How C# Compiles
tags:
  - Tech
  - CSharp
date: '2023-04-18T10:35:07.322Z'
---

I'm taking time to dig into a more enterprise level language. For me, it's a good opportunity to learn from technology that was built to scale so that my work in other languages can be informed by that long term scalability.

Here are some concepts that are important to know before diving into the language:

# Compiling

Major C family languages C and C++ are also compiled, but they compile directly to machine code. So there's a limit to what machines the programs can be run on — compiling to windows means no linux support.

C# is compiled, but instead of compiling to machine code, it's brought down to IL code (Intermediate Language.) This actually borrows from Java, famous for the tagline "write once, run anywhere!"

The IL code can then be run on any machine with a the Common Language Runtime (CLR) installed. The CLR will take the IL code and compile it to machine code from there. For C#, the CLR is part of the .NET framework, so any apps developed through .NET have this same flexibility of running on multiple platforms.

JavaScript in the browser is actually an interpreted language. The code is given to browser that take the instructions and executes at runtime.[^1] Node would be a closer comparison since its compiled. It's passed through the V8 engine which compiles Node code to machine code.

[^1]: It turns out that modern browser actually do a mix of interpreting and compilation. A really interesting article s here on [Lin Clark's blog](https://hacks.mozilla.org/2017/02/a-crash-course-in-just-in-time-jit-compilers/).
