---
title: Polymorphism Through Abstract Classes in C#
tags:
  - Tech
  - C#
  - Object Oriented Programming
date: '2023-05-19T10:35:07.322Z'
---

One of the 3-7 pillars of Object Oriented Programming (number depending on who you talk to) is Polymorphism.

What is polymorphism?

When designing classes, it's sometimes helpful to have parent-children relationships. A "Vehicle" class could have attributes like "Passengers," "Color," and "Speed". It can have methods like "FuelUp", "LoadPassangers", etc.

Deriving from that, we can then have child classes for Cars and Boats.

Here's what that would look like in C#:

```
namespace ChrisGarage
{
    public class Vehicle
    {
        private List<string> Passengers = new List<string>();
        public readonly string Color;

        public void LoadPassenger(string passenger)
        {
            // . . .
        }

        public Vehicle(string color)
        {
            if (String.IsNullOrEmpty(color))
            {
                throw new ArgumentException("Color String cannot be null");
            }
            Color = color;
        }

    }

    public class Car : Vehicle
    {
        public Car(string color) : base(color) { }


    }

    public class Boat : Vehicle
    {
        public Boat(string color) : base(color) { }


    }
}
```

Easy!

So that's inheritance, but it's not quite polymorphism. Polymorphism is the manipulation of the inherited classes to suit the needs of the children classes.

Continuing with the vehicle example, it's safe to say that all vehicles move. They'll need a "Move" method.

But a car does not move in the same way a boat moves!

We could define those separately on the children. But it's safe to say, if it's a vehicle, we expect it to move. We want the vehicles to conform to that shape.

Why? Say we're iterating through a list of vehicles and running the move method on them. We want to be sure that there _is_ a move method.

We can enforce that through the `abstract` and `override` keywords.

```
// Declaring class as abstract, in other words, incomplete.
    public abstract class Vehicle
    {
        private List<string> Passengers = new List<string>();
        public readonly string Color;

        public void LoadPassenger(string passenger)
        {
            // . . .
        }

        public Vehicle(string color)
        {
            if (String.IsNullOrEmpty(color))
            {
                throw new ArgumentException("Color String cannot be null");
            }
            Color = color;
        }

        // Adding the move abstract
        public abstract void Move();


    }

    public class Car : Vehicle
    {
        public Car(string color) : base(color) { }

        // Writing custom car algorithm
        public override void Move()
        {
            Console.WriteLine("Drive");
        }
    }

    public class Boat : Vehicle
    {
        public Boat(string color) : base(color) { }

        // Writing custom Boat algorithm
        public override void Move()
        {
            Console.WriteLine("Sail");
        }
    }
```

On the parent, we set the class as `abstract` and include an `abstract` method to signal that we want this method to be completed by developers designing the derived classes.

On the children, we use the `override` keyword and do the work of deciding how each vehicle should move.

A note on `abstract`: If you wanted to provide some base implementation, you could use the `virtual` keyword instead and write out your procedure. Virtual also makes overriding optional.

You then can decide to call the base class's Move method, the way that we do here for the Draw method:

```
public class Rectangle : Shape
{
    public override void Draw()
    {
        base.Draw();
        Console.WriteLine("Rectangle");
    }

}

```
