---
title: Parsing Markdown in Node
date: '2022-05-19T05:35:07.322Z'
tags:
  - node
  - tech
  - blog
published: true
---

I'm writing my own markdown-based blog, and had a lot of fun getting into the nitty gritty of file reading and text manipulation. It takes a little more writing than off the shelf solutions, but I wanted to have more control and ownership over the process.

# Sample File

I have a file written like so:

```
---
title: Parsing Markdown in Node
tags: node, blog, tech
date: 2022-05-19

---

## Sample File

I have a file written like so:
```

The main body of the post is pre-pended by metadata. I want to grab the metaData so it can be used in our formatting engine, and extract it from the post body separately.

A few tools will help along the way:

# Libraries

## Node File System

Built into node, I'll use `fs` to open the data and extract it as a string that can be parsed. `readdirSync` scans the given file directory for the folder I'm looking for. `readFileSync` will parse the file and return it's contents as a string I can later manipulate.

Both these methods actually have asynchronous counterparts! My files are not resource heavy at all, so there's no need to run concurrent asynchronous calls. It could be handy for larger amounts of data, though.

The `path` below is constructed with a variable passed in by the user, so I'll handle the case that they've entered a file that doesn't exist.

```
const files = fs.readdirSync(path);
const fileName = files.find((file) => {
	return file.includes('.md');
});

if (!fileName) {
	console.error('No file found');
	return res.sendStatus(404);
}


const markdown = fs.readFileSync(`_posts/${postName}/${fileName}`, 'utf8');
```

## Showdown

With the string version of the file in handle, I'll ees [Showdown](https://github.com/showdownjs/showdown) to convert the body to html. It's simple and flexible, bidirectional, if you need it to be. Conversion takes just a few simple lines of code:

```
const showdown = require('showdown');

const converter = new showdown.Converter();
const postHtml = converter.makeHtml(postBody);
```

## Regex

From here, it's all string manipulation to get the data I need.

Potentially, a splitting the string by the bars ('---') would be enough. Using regex, though, will keep the process more flexible, incase in the article I use the same bars to break a section.

This regex will do the trick:

```
'---(.*)---\n(.*)'
```

The `match` method in JavaScript, returns separate capture groups as part of the returned array. The return value contains:

- index 0: full match (the entire document in our case)
- index 1: the first capture group, our tags
- index 2: the second capture group, the post body

From here, it's built in JS split, map, and trim methods to grab the data.

# Voilà!

HTML post body and metaData received!

Here's the full code:

```
const fs = require('fs');
const parseMarkdownPost = require('../utils/parseMarkdownPost');

const showdown = require('showdown');

module.exports = (markdown) => {

  const fileRegex = new RegExp('---(.*)---\n(.*)', 's');
  const splitMarkdown = markdown.match(fileRegex);
  if (!splitMarkdown || splitMarkdown.length < 3) {
    console.error('Misformatted document.');
    return res.sendStatus(404);
  }
  const [match, metaData, postBody] = splitMarkdown;
  const metaDataObj = {};
]

  metaData.split('\n').forEach((line) => {
    // Store into data object
    const [key, value] = line.split(':').map((item) => item.trim());
    // if tags, split into an array
    if (key === 'tags') {
      // Let's actually delineate tags by commas instead of -'s.
      const tags = value.split(',').map((item) => item.trim());
      metaDataObj[key] = tags;
    } else {
      metaDataObj[key] = value;
    }
  });

  // Convert to html
  const converter = new showdown.Converter();
  const postHtml = converter.makeHtml(postBody);

  return [metaDataObj, postHtml];
};
```

indexController.js

```
const showdown = require('showdown');

module.exports = (markdown) => {
  // Regex matches the bars, captures the meta data, and then goes on to capture the article.
  // The s (single line) option allows the dot to also capture new lines.
  const fileRegex = new RegExp('---(.*)---\n(.*)', 's');
  const splitMarkdown = markdown.match(fileRegex);
  if (!splitMarkdown || splitMarkdown.length < 3) {
    console.error('Misformatted document.');
    return res.sendStatus(404);
  }
  const [match, metaData, postBody] = splitMarkdown;
  const metaDataObj = {};

  // Parse metaData
  metaData.split('\n').forEach((line) => {
    // Store into data object
    const [key, value] = line.split(':').map((item) => item.trim());
    // if tags, split into an array
    if (key === 'tags') {
      // Let's actually delineate tags by commas instead of -'s.
      const tags = value.split(',').map((item) => item.trim());
      metaDataObj[key] = tags;
    } else {
      metaDataObj[key] = value;
    }
  });

  // Convert to html
  const converter = new showdown.Converter();
  const postHtml = converter.makeHtml(postBody);

  return [metaDataObj, postHtml];
};
```

parseMarkdownPost.js
