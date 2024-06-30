---
title: Regex Capture Groups in Node
tags:
  - Tech
  - Regex
  - JavaScript
  - Node
  - This Website
date: '2024-03-01T10:35:07.322Z'
---

I've been writing some regex for the blog. My blog is in markdown, so there's a fair amount of parsing I'm doing to get the data I need.

But it took some figuring out to understand how I could get my capture group through regex. Execute regex with single line strings wasn't a problem, but passing in a multiline markdown file proved challenging. 

So here's a quick reference for using Regex in Node:

## RegExp Class

```JavaScript
new RegExp('\[([^\n\]]+)\]', 'gi').exec('[a][b]')
// ['a']
```

Returns only the capture groups. Oddly, there *is* a groups attribute if you log in a Chrome browser, but it's undefined in the above example.

The issue here comes with multiline string. If my match were down a few lines, I would get no result. 

You would think to flip on the global flag, but trouble arises. More on that soon.

## RegExp Literal

```JavaScript
/\[(a)\]/g.exec('[a][b]')
// ["[a]", "a"]
```

Returns the full match first, then the grouped result. Different from the class!

I was curious and checked it was an instance of the RegExp class:

```
/fdsf/ instanceof RegExp
// true
```

And so it is! Perhaps it inherits properties, but changes some method implementations...

## String Match

```JavaScript
'[a][b]'.match(/\[(a)\]/g)
// ["[a]"]
```

You can also call regex on a string directly, but you'll only get the full match. No capture group isolation.

Again, problems here when it comes to multiline strings and passing the global flag.

## The Global Option

The Global option interferes with the result. For example: Passing a global flag to the `RegExp` class will actually not allow the search to run properly.

The only working method I've found for multi line regex search with capture groups is using the Regexp literal.

My working example:

```JavaScript
const artUrlRegex = /[.|\n]]*\!\[.*\]\((.*)\)/;

const urls = artUrlRegex.exec(postMarkDown);

if(urls) {
	const imageUrl = urls[1];
	. . . 
}
```

Surprisingly complicated! Hope this helps direct any of your future regex use.
