---
title: Goroutines, Structs, and Pointers in Go
tags:
  - Tech
  - Go
date: '2023-10-13T10:35:07.322Z'
---

A potpourri of Go features I dove into this week!

## Structs

Last week I looked at the Maps data type. It works similar to a JS Object, except all values must be the same type.

Structs in Go are a data structure for saving mixed Data Type values. Here's what they look like:

```
// Type Declaration
type UserData struct {
	firstName string
	lastName string
	email string
	numberOfTickets uint
}

// Can then be used in array or slice
var sales = make([]UserData, 0)

var userData = UserData {
	firstName: "Chris",
	lastName: "Padilla,
	email: "hey@chris.com",
	numberOfTickets: 2,
}


// accessing values:

booking.firstName

// in a map, you would use bracket syntax
// booking["firstName"]

```

This is comparable to a lightweight class in languages like Java and C#. And, of course, the type declaration will look familiar to any TypeScript users.

## Goroutines

This is what I've been waiting for!

*Goroutines* are the key ingredient for Go's main benefit: Lightweight and easy to use concurrency.

The strengths of Go over other languages:

- Less overhead structurally
- Less complex to write and manage
- Threads in other language are more expensive as far as memory used compared to Go

Goroutines are an abstraction of an actual OS thread. They're cheaper and lightweight, meaning you can run hundreds of thousands or even millions without affecting the performance of your application.

Java uses OS threads, takes a longer startup time. Additionally, those threads don't have an easy means of communicating with each other. That's made possible through channels in Go, a topic for another day!

### Sample Code

The syntax for firing off a concurrent function is pretty simple:


```
// Do something expensive and Block the thred
sendTickets()

// Now try this non-blocking approach, creating a second goroutine
go sendTickets()
```

There's a bit of extra work needed to align the separate Goroutine with your main function. If the above code was all that was in our program, the execution would exit before the result from `sendTickets()` was reached.

Go includes `sync` in it's standard library to help with this:


```
import (
	"sync"
	"time"
)

var wg = sync.WaitGroup{}

wg.Add(1)
go sendTickets()

wg.Wait()

func sendTickets() {
	// Do something that takes a while.
	wg.Done()
}
```

When we create a Wait Group, we're essentially creating a counter that will keep track of how many concurrent methods have fired. We add to that counter before starting the routine with `wg.Add(1)` and then note when we want to hold for those goroutines to end with `wg.Wait()`

Already, with this, interesting possibilities are now available! Just like in JavaScript, you can set up a `Promise.all()` situation on the server to send off multiple requests and wait for them all to return. 

## Pointers

Pointers are the address in memory of a variable. Pointers are used to reduce memory usage and increase performance. 

The main use case is in passing large variables to functions. Just like in JavaScript, when you pass an argument to a function, a copy is made that is then used within that function. If you were to pass the pointer instead here, that would be far less strain on the app's memory


```
func bookTickets(largeTicketObject TicketObj) string {
	// Do stuff with this large object
	
	return "All set!"
}
```

Also, if we made changes to this object and wanted the side effect of adjusting that object outside the function, they wouldn't take effect. We could make those changes with pointers, though.

To store the pointer in a var, prepend & to the variable name:

```
x := 5
xPointer = &x
fmt.Println(xPointer)

// Set val through pointer

*xPointer = 64

fmt.Println(i) // 64
```