---
title: Structs in Go
tags:
  - Go
date: '2023-10-26T10:35:07.322Z'
---

There are two ways of creating datatypes similar to JavaScript Objects and Python Dictionaries in Go: Structs and Maps.

**Structs** are a collection of data that are related. Values are stored next to each other in memory. Structs are also a value type. 

**Maps** are a hash map data type. They are a key value pair where both keys and values are statically typed individually. So all keys need to be of the same type, and all values need to be the same type. The main benefit is that, as a hash map, indexing and look up is much faster.

Let's break all that down:

Values are stored next to each other assuming the value will be lightweight. In this way, it's similar to an array where the keys are strings. Though, the values are not indexed the way that a hash map would for its keys. The tradeoff is that the value is lighter on memory, but slower to iterate through.

Structs are a value type. So if we were to pass them into a function, the entire struct would be copied. Maps, on the other hand, are a reference type. The address in memory for the Map is passed into a function and any changes to the map within the function will occur as a side effect to the same Map.

## Structs

Declaring structs requires a type to be created first:

```
type car struct {
	make		string
	model		string
	maxSpeed	int
}

c := car{make: "Toyota", model: "Prius", maxSpeed: 120}

```

## Methods

Go isn't an Object Oriented Language, but like JavaScript, can be implemented with similar principles. An example is having methods on Structs:

```
type car struct {
	make		string
	model		string
	maxSpeed	int
}

func (c car) floorIt() int {
	return c.maxSpeed
}

c := car{make: "Toyota", model: "Prius", maxSpeed: 120}
c.floorIt() // 120
```

## Embedding

Another OOP principle borrowed in Go is *composition*. In Go, we can embed structs to create more complex types while still maintaining the flexibility of smaller pieces available as individual structs.

```
type car struct {
	make		string
	model		string
	maxSpeed	int
}

type raceCar struct {
	car
	turboEngine	string
}

rc := raceCar{
	car: car{
		make: "Toyota",
		model: "Prius",
		maxSpeed: 120,
	},
	turboEngine: "MAX"
}

```