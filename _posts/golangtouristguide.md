---
title: Tourist's Guide to Go
tags:
  - Tech
  - Go
date: '2023-10-06T10:35:07.322Z'
---

I'm dipping my toes into Go! I became interested after hearing about how accessible it makes multi-threaded logic to coordinate, especially on cloud platforms.

I've been there with JavaScript and Python: it could be handly for processes running in tandem having the ability to communicate. Seems like Go opens this communication channel in a way that's easier to manage than a language such as Java. (All from hearsay, since I've not dabbled in Java just yet.)

I'm excited to dig into all that! But, as one does, first I'm relearning how string templating works in the new language:

## Compile Time Errors

When getting ready to run a `main.go` file, checks will be made to ensure there aren't any procedural errors. Go checks for unused variables, ensures types match, and that there are no syntax errors. A nice feature for a server side language, keeping the feedback loop tight!

## Static Typing

Like C# and Java, Go is statically typed. On declaration, variables need to be assigned a type.

```
var numberOfCats uint
```

When assigning, the type can be inferred:

```
const conferenceTickets = 50

```

## Variables

Constants and mutable variables exist here. Somewhat like JavaScript, the `const` keyword works, and `var` functions similarly to how it does in JavaScript. No `let` option here.

A shorthand for declaring var is with `:=` :

```
validEmail := strings.Contains(email, "@")
```

This does not work with the `const` keyword, though.

## Slices and Arrays

Arrays, similar to how they work in lower level languages, must have a set length defined on declaration:

```
var bookings [50]string
```

Slices, however, are a datatype built on top of Arrays that allow for flexibility.

```
var names []string
```

Both require that all elements be of the same type, hence the `string` type following `[]`.

## Maps

Maps in Go are synonymous with Dictionaries in Python and Objects in JavaScript. Assigning properties can be done with the angle bracket syntax:

```
newUser := make(map[string]string)

newUser["firstName"] = userName
newUser["email"] = email
newUser["tickets"] = strconv.FormatUint(uint64(userTickets), 10)
```

Maps can be declared with the `make` function:

```
newUser := make(map[string]string)
```

## For Loops

There's only one kind of For loop in Go. Syntactically, it looks similar to Python where you provide a `range` from a list to loop through:

```
for _, value := range bookings {
	names := strings.Fields(value)
	firstName := names[0]
	firstNames = append(firstNames, firstName)
}
```

Range here is returning an index and a value. Go will normally error out if there are unused variables. So to denote an intentional skip of the index property, the underscore `_` will signal to go that we're ignoring this one.

## Package

Like C# Namespaces, files in go can be grouped together as a _package_. You can do so with the package keyword at the top of the file:

```
package main

import (
	"pet-app/cats"
	"fmt"
	"strconv"
	"strings"
)

func main() {...}
```

Notice "pet-app/cats": here we can import our packages within the same directory with this syntax. "pet-app" is the app name in the generated "go.mod" file, and "cats" is the package name.

## Public and Private Functions

By default, functions are scoped to the file. To make it public, use a capital letter in your function name so it may be used when imported:

```

func BookTickets(name string) string {
	// Logic here
	return res
}
```
