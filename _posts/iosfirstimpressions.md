---
title: First Impressions from Native iOS Development
tags:
  - Tech
  - Swift
  - iOS
  - Mobile
date: '2025-01-29T10:33:07.322Z'
---

I was in need of a detour. I've been pretty focused on large projects in the web dev category. So, to scratch the curiosity itch, I hacked away at a very simple iOS app.

I had a few questions I was looking to answer going in. I was largely curious about how big the gulf really was between web development and native.

Additionally, what are the benefits of fully committing to an ecosystem? VS Code is fine-tuned for JavaScript and web development, while Visual Studio is a full IDE for C# and .NET. In that sense, I had some experience, but I was still curious about how this plays out on the Apple side.

Note: I've only given this a couple of weeks of playing around in my off time. Thoughts here are first impressions, not expert opinions from a seasoned iOS dev. Take all of the following with a grain of salt.

## Swift

Apple's programming language for their products is fairly quick to pick up. [The tour of the language](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/guidedtour/) on the swift docs site gets you most of the way there, and most of it is analogous to any other language that supports classes.

### Unwrapping

The one concept that takes getting used to is _unwrapping_. I'll do my best to explain concisely, since I don't want to distract too much from the rest of the post.

Swift has an `Optional` type that you can denote with a question mark. If I were to try to use this value later, I would get a compile time error:

```
let color: String? = nil

print(color) // Warning: Expression implicitly coerced from 'String?' to 'Any'
```

`color` as a variable has reserved space in memory for a value, but it's not guaranteed that the value is there. That is what the `Optional` type is communicating. Hence the warning when `print` receives an optional type.

The swift way of handling this is to _unwrap_ the value.

```swift
if let color = color {
    print(color)
}
```

On the left side of the operator, I'm declaring a new `name` variable for the block scope. On the right, I'm assigning it the value of my original `name` variable. At the start of this line, I'm checking that a value exists with an `if` statement.

By this point, if a value exists, Swift knows this is no longer an `Optional` value and we are safe to call print with `color`.

There's even a shorthand since this is so commonly done:

```swift
if let color {
    print(color)
}
```

Essentially, _unwrapping_ is a fancy term for asserting that a value exists on the variable. The nice thing about swift as a statically typed language is that it will encourage you to check your values in ambiguous scenarios.

### XCode

XCode has been interesting to use. Unsurprissingly, the typography and design is very Apple. In that sense, it's delightful.

Like any new program, it's easy to be overwhelmed by the sheer number of menus and options to toggle. However, it doesn't take long to find the few options you'll use the most often.

It's a seamless dev experience working with iOS apps here. Unsurprisingly, when the software is designed for a specific platform, it works really well with said platform. Spinning up a simulated app environment is quick and easy. UI wise, you have a couple of options between SwiftUI and UIKit when sticking to Apple support. And adding components from those libraries is as easy as drag-and-drop.

One thing that takes getting used to is a UI interface for adjusting any elements I add to the Storyboard visual editor. When you're used to scanning documentation or skimming through the options in intellisense to find input options, it feels a bit slow and laborious to have to paw through menus to find where I can resize a button element. Perhaps there are other ways of working with elements that are more text driven. Either way, I'm sure it would just take some time to familiarize oneself with where all the menus are.

One of the most interesting features lies in the intersection between Interface Builder elements and the hand written code. Interface Builder is the WYSIWYG style visual pane for adding elements to a view. However, you can connect them to your own custom written swift classes. Doing so even has the nice UI flare of simply dragging and dropping the element into a line of swift code.

```Swift
import UIKit

class DetailViewController: UIViewController {
    // This line was added by dragging and dropping (while holding ctrl)
    // the imageView from the Interface Builder
    @IBOutlet var imageView: UIImageView!
    var selectedPhoto: String?
    var photoTitle: String?

     override func viewDidLoad() {
        super.viewDidLoad()
        title = photoTitle

        if let imageToLoad = selectedImage {
            imageView.image = UIImage(named: imageToLoad)
        }
    }
}
```

There is a certain magic there. Seeing a visual element and being able to hook into it this way.

## Impressions

My assumption was that learning Swift would take a bulk of the on ramp time, and then developing on Apple's platform would be smooth sailing. I found the opposite to be true. Swift, at least at this stage in my tinkering, wasn't event the meat and potatoes of my development. It was largely working with interface building, laying out elements there, and then writing a few lines of swift code to get specific functionality.

Perhaps that's unsurprising at the entry level. But I'll say, since a bulk of the benefit of native development is using native interfaces and components, it makes sense that I don't have to type nearly as much boilerplate or initialization code to get started. So in that sense, the language is not the barrier to entry.

However, gettinng up to speed on platform development _does_ take time here. I've come to find this more true with the more tooling I use. Languages are largely similar in their feature set. The frameworks and platforms, however, all require you to learn their way of developing. It's as true for iOS dev as it is for React. So, when learning this sort of thing, much of the time will be spent here.

Largely, though, once that hurdle is covered, the all-encompassing IDE is a smooth experience. Apple is known for excellent design. So it's nice to know that, out of the box, I'm working with components that are elegant to use.

All in all, a great first impression.
