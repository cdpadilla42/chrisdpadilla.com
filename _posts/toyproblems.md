---
title: Learning Syntax the Fun Way with Toy Problems
tags:
  - Tech
  - JavaScript
  - CSharp
date: '2023-05-05T10:35:07.322Z'
---

Yes, you _could_ go through tutorials and just type along with the video. Yes you _could_ read documentation.

Most of us get into programming, though, because we like solving puzzles. It's not the only reason, but programmers are just those sort of folks that have an itch that's only scratched by seeing a destination and writing their way to it.

Say I'm prompted to write a method that converts a string into Pascal Case. Sure, I know how to do that in JavaScript! Heck, I can even do it in one line like a **COOL PERSON**:

```
string.split(' ').map(x => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase())
```

The fun part is knowing how to get that solution and discovering the C# way to do it.

```
static void ConvertToPascalCase()
{

    Console.WriteLine("Enter a few words seaerated by spaces:");
    string inputValue = Console.ReadLine();
    string[] inputWords = inputValue.Split(' ');
    string[] processedWords = new string[inputWords.Count()];
    for (int i = 0; i < inputWords.Count(); i++)
    {
        string word = inputWords[i];
        string res1 = word.Substring(0, 1).ToUpper();
        string res2 = word.Substring(1).ToLower();
        processedWords[i] = res1 + res2;
    }

    string pascalCaseRes = String.Join("", processedWords);

    Console.WriteLine(pascalCaseRes);

}
```

There's a double whammy here: You get to practice programatic thinking, and you get to learn the nuances of syntactical differences in another language.

Plenty of ways to make it a triple whammy, too!

- You could be finding the canonical source for documentation in a language.
- You could go down any number of small rabbit holes learning about the intricacies of a language. Say, for example, when to use the `this` keyword in C#.
- Maybe you're like me and you're also getting used to another IDE / Text Editor. In my case, I'm using Visual Studio to learn C# instead of VS Code.

If it's been a while for you, I'd recommend diving in and giving it a try! I think you'll be surprised by how much you enjoy it.
