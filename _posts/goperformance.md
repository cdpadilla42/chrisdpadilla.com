---
title: Go Performance
tags:
  - Tech
  - Go
date: '2023-11-09T10:35:07.322Z'
---

## Performance and Memory

When looking at a language's performance, the two considerations here are memory usage and performance speed.

Taking two ends of the spectrum, we could look at Rust on one end and C# on the other.

C# is a high level language that requires interpreting through a Virtual Machine. (A strange example, perhaps, because C# does compile, but only to the Intermediary Language, and not directly to machine code) C# Also handles memory management. The overhead of the virtual machine and memory management leads to a fluid developer experience, but makes compromises in performance speed and memory usage.

Rust, on the other hand, is a compiled language. Meaning that to run rust, you'll build an executable from the human readable Rust code. This saves the time it would take a virtual machine to interpret the language. Or, in the case of Python or Ruby, it would eliminate the time it takes for the runtime to interpret the script.

Rust also requires the developer to do much of their own memory management. When written properly, this allows for really performant applications, since that's an extra bit of overhead taken off from running Rust code.

## Where Go Fits

Go uniquely sits an a great position between these two ends to balance the benefits offered by a higher level language while still providing the speed of a compiled language.

Go _does_ compile to machine code. You can run `go build main.go` to compile the script down to an exe file. So we get the benefit of quick execution, eliminating the need for interpretation time.

While doing so, Go bundles a much lighter package called the Go Runtime that handles Garbage Collection. With a specialized focus on memory management, this still allows for that DX experience while not adding as much overhead as the Java Runtime Environment or the Common Language Runtime in C#.

Comparisons of Go's speed are right between the end of compiled, non-Garbage Collected languages like C, C++, and Rust, and the higher level language features of Java and C#.

One added benefit of being compiled is having one less dependency in your deployment environment. The platform isn't required to have a specific version of a Go interpreter available to execute a program.
