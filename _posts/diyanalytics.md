---
title: DIY Analytics & CORS
tags:
  - Tech
date: '2022-09-14T05:35:07.322Z'
---

I've been [exploring analytics options](/analytics). I have a use case for them, but we're more concerned with specific user behavior on this project. We want to know if they click a certain button, or make it to a certain page.

There are some options. Google Analytics provides journeys and goals, though is heavy handed for our use case. Other solutions like Fathom would keep track of individual page performance, but there are certain actions that we're interested in.

So the need arose! I wrote a custom solution for our app.

# Overview & Stack

We're using React on the client. Since button interactions are our main metric, we essentially need something that can be integrated with our click handlers on the client.

Easy enough! We can fire off a POST request to an external API that records the interaction.

For the API, I opted to spin up a Next.js API. [A single serverless function](/weeklyplaylist) may have been more appropriate, but I was short on time and know that I can deploy quickly with Next and Vercel.

For storing data, I created a new Database with MongoDB Atlas. Similarly here, this may more than what we really need, but familiarity won out!

# Client Side

In my React app, I'm adding this utility function that fires when ever I want to record an action:

```
export const recordInteraction = (type) => {
  const data = { type };

  fetch('https://analytics-api.vercel.app/api/mycoolapihandler', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};
```

`type` here is simply a string for what event is recorded. It could be "Submits form", "turns on dark mode", or any unique way of identifying an action!

The rest is your run of the mill fetch request handling.

# API handler

On the other side of our endpoint is this handler:

```
import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);

  if (req.method === 'POST') {
    const { client, db } = await connectToDatabase();

    const myObj = {
      date: new Date(),
      type: req.body.type,
    };

    const dbRes = await db
      .collection('acnm')
      .insertOne(myObj, async function (err, res) {
        if (err) throw err;
        console.log('1 document inserted');
        await client.close();
      });

    res.status(200).json({ message: 'Data recorded' });
  } else {
    res.status(200).json({ name: 'Ready to record' });
  }

  return res;
}

```

First, you'll notice `runMiddleware()`. I'll explain that in a second!

If we receive a POST request, we'll do the following:

- Connect to the DB (largely borrowing from [Next.js's great example directory](https://github.com/vercel/next.js/tree/canary/examples/with-mongodb) for setup)
- Create `myObj`, a record of the current time of request and the type of request.
- insert it into the database
- return a success message

# CORS Middleware

There are a few steps I'm skipping - validation, schema creation, sanitization. But, this api is only going to interact with my own application, so I'm not concerned about writing a very extensive request handler.

The way I'm keeping it locked down, out of harms way from the world wide web, is through CORS.

An incredible thorough look at CORS is available at [MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS). For our purposes, we just need to know that this is how our API will whitelist _only_ our application's url when receiving requests.

Back to the `runMiddleware()` method! Here is the function declared in the same document:

```
import Cors from 'cors';

// Initializing the cors middleware
const cors = Cors({
  methods: ['POST', 'GET', 'HEAD', 'OPTIONS'],
  origin: ['https://mycoolapp.netlify.app', 'https://mycoolapp.com'],
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}
```

The `cors` npm package is a great way of managing CORS without getting into manipulating the headers directly. In our instantiation, we're passing a few options for approved methods and the origins we want to white list. (NO trailing slash, FYI!)

`runMiddleware()` is the simple wrapper function that handles us using the cors middleware with our request.

# Using the Data

The nice thing about using Mongodb, or any full blown DB with a sophisticated querying language, is the ability to make use of your data! Our model only has a few simple terms:

```
{
	_id,
	date: Date,
	type: String,
}
```

But, that's plenty for us to be able to answer questions such as "How many people submitted a form in the last month." A perfect solution for our case.
