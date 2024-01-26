---
title: Collocation in React Server Components
tags:
  - Tech
  - React
date: '2024-01-26T10:35:07.322Z'
---

At work, we're starting to spin up a Next.js app and are using the new server components! I'll share a quick look at a simple example of what it looks like and why this is a return to form for website building on the web.

## A Brief History of Templating

The pendulum of web development needs and trends have swung back and forth between two sides: Heavy lifting on the client, and on the server. When thinking about an application that uses dynamic content (forums, user account sites, wikis), the major glueing that needs to happen is between data and templates. Somewhere, you have to populate a template with the requested data based on the page.

Historically, web servers handled this with templating frameworks. Popular Express templating engines include Pug and Handlebars, in C# the ASP.NET framework uses Razor pages.

A popular design pattern for these types of servers was the Model-View-Controller approach. Essentially, separating file functions based on the roles they played.  

When React gained popularity, it was for it's... well, Reactivity. By handling templating on the client, smaller components were able to respond dynamically, eliminating the need for an entire page refresh.

Web performance standards, driven largely by Google's own SEO rankings of pages, have since reigned in the excessive use of client side code for public facing web pages. 

And so, the pendulum is swinging back, and the React framework has taken an official stance on how to solve the issue within their own API.

By acting as a templating engine on the server, the amount of js shipped to the client majorly shrinks, allowing for faster page loads with a lighter footprint on the client. All the while, React still structures this in such a way that you can maintain some of the best features of using the JS framework, including component reactivity and page hydration.

## Server Components

Examples here will come from Next.js, which at this time is required to have access to this new feature.

By default, all components are marked as server components. A server component for a page may look like this:

```
import React from 'react';
import db from 'lib/db';
import {getServerSession} from 'next-auth';
import authOptions from '@api/auth/[...nextauth]/authOptions';
import ClientSignIn from './ClientSignIn';

const PageBody = async () => {
	const session = await getServerSession(authOptions);

	return (
		<div className="m-20">
			Hello {session.name}!
			<br />
			<ClientSignIn session={session} />
		</div>
	);
};

export default PageBody;

```

You can read the functional component linearly as you would a vanilla js function. We're essentially writing a script saying "get the session, await the response, then render my page."

In this simple example is one of the larger paradigm shifts as well as the power of the new feature. 

Were I to write this on a client component, I would have to write a `useEffect` that fetched my session data, I would have to expose an API on my server, write the logic on the server to get the session data, and store the data in my client side state, and then finally render my data. Except, additionally, I would have to manage loading state on the client – showing a skeleton loader or a spinner, and then rending the page when the data has loaded. Phew!

Here, we've skipped several of those steps by *directly* accessing the database and returning the result in our JSX. If I needed to, I could massage the data within the component as well, work that otherwise would have required a separate API to handle or would need to be done on the client.

## Colocation

The main paradigm shift here is **colocation** in favor of **separation of concerns**. The first time writing a db query in a React component is a jarring moment! But, colocation is a trend we've seen in motion even with CSS in JS libraries. This furthers it by having all server related code and templating code in one react server component. 

For complex apps, this colocation can be a nice DX improvement, with all the relevant business logic not far from the template. All the while, the option for abstraction and decoupling is still available. 

Many more thoughts on this, but I'll leave it there for today!
