---
title: Polymorphism in Java
tags:
  - Tech
  - Java
  - OOP
date: '2024-04-26T10:35:07.322Z'
---

Of the core pillars of Object Oriented Programming, **Polymorphism** affords a great deal of flexibility. While inheritance allows for encapsulated and abstracted data to be shared, polymorphism allows for the redefining of both the data and the attached methods based on context. 

Java supports polymorphic behavior through two means: 

- Method Overloading
- Method Overriding

## Demonstration

Say that I have an `ArchiveItem` class that stores the basic details of a name and id. Here I'll demonstrate both overloading and overriding:


```Java
package polymorphism;

public class ArchiveItem {
	private String id;
	private String name;
	
	// Overloaded constructor with all instance variables supplied
	public ArchiveItem(String id, String name) {
		this.id = id;
		this.name = name;
	}

	// alternative constructor with only the name provided
	public ArchiveItem(String name) {
		this.name = name;
		this.id = IDPackage.generate();
	}

	// Override the base equals() method
	@Override
	public boolean equals(Object compared) {
		if (compared == this) return true;
		if (!(compared instanceof ArchiveItem)) return false;

		ArchiveItem comparedItem = (ArchiveItem) compared;

		return this.id.equals(comparedItem.id);
	}

	// Override the base toString() method
	@Override
	public String toString() {
		return String.format("%s: %s", this.id, this.name);
	}

	
}

```

Taking a look at my constructors, I'm overloading the `ArchiveItem` method by declaring the same method, but with a different number of arguments both times. When instantiated, Java will know which of the two methods to run based on what arguments are provided. Another way of putting it: The methods will be called depending on their signature.

Looking further down, I've written an `equals` and a `toString` method. All Objects in Java come with these methods. Every class inherits from the base Java Object class, and on that class are implementations for `equals` and `toString`. In fact, `toString` is what's called anytime you print to the console.

By adding the `@Override` annotation, I'm declaring that I'm intending to implement my own logic for the already inherited `toString` method. The `@Override` annotation is actually not necessary, but recommended. This will flag to the compiler to check that you're in fact overriding an existing method. Great for catching typos!

## Putting It All Together

```Java
ArchiveItem piano = new ArchiveItem("Piano");
System.out.print(piano);
// "Piano, 93nkf903f"
```

Here it is in action! The `ArchiveItem` is instantiated with only one argument, so it calls the matching method. One line down, I'm calling my implementation of `toString` by passing my piano object into the print method.

