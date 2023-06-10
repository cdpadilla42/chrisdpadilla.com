---
title: Iterators in C#
tags:
  - Tech
  - CSharp
date: '2023-05-11T10:35:07.322Z'
---

In JavaScript, there's a bit of magic in arrays and objects. They have methods themselves like `myArray.toString()`, and they also have a special way of accessing entries through iterator selectors `myArray[2]`.

C# actually exposes this method of class design through iterators!

To get that functionality, we need a method on the class that uses the this keyword:

```
 public string this[string key]
{
    get
    {
        return _dict[key];
    }
    set
    {
        _dict[key] = value;
    }
}
```

Above, we'll assume `_dict` is of type `Dictionary`, a built in Class that functions just like a Python dictionary or JavaScript object.

I've typed the above iterator value with a string, but you could set is as an int and use a List just as well.

Here's what it looks like if we were to reproduce some of the functionality of a JavaScript object:

```
using System;
using System.Collections.Generic;
namespace HelloWorld7

public class Object
{
    private Dictionary<string, string> _dict = new Dictionary<string, string>();

    public Dictionary<string, string>.KeyCollection Keys()
    {
        return _dict.Keys;
    }

    public string this[string key]
    {
        get
        {
            return _dict[key];
        }
        set
        {
            _dict[key] = value;
        }
    }
}
```

An exception: we can't really expose keys as a static method like we would in JavaScript here. If `Keys()` is made static, we would also have to make the internal `_dict` public, which defeats the purpose of encapsulating it.

Once that's set, you can create an object instance and return keys like so:

```
class Program
{
    static void Main(string[] args)
    {
        var myObj = new Object();
        myObj["name"] = "Chris";
        myObj["city"] = "Dallas";
        myObj["pets"] = "Lucy";
        Dictionary<string, string>.KeyCollection keyColl = myObj.Keys();

        foreach (string key in keyColl)
        {
            Console.WriteLine(key);
        }
        // name
        // city
        // pets
    }
}
```
