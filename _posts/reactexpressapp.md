---
title: Rendering a React App from an Express Server
tags:
  - Tech
  - React
  - Node
  - AWS
  - Architecture
date: '2022-12-16T04:35:07.322Z'
---

I'm revisiting my older portfolio pieces from a few years ago with a new understanding. One of my favorites is a MERN stack app where React is served from the Express server. Here, I'll share the birds-eye view on setting up these applications to be served from the same host.

# Why One App?

The common way to serve a stack with React and Express is to host them separately. Within the MERN stack (MongoDB, Express, React, and Node), your databases is hosted from one source, Express and Node from an application platform, and your React app from another, JAMstack friendly source such as Netlify or Vercel.

The benefits of that are having systems with high orthogonality, as Dave Thomas and Andy Hunt would put it in [The Pragmatic Programmer](/pragmaticprogramer). With one application purely concerned about rendering and another handling backend logic, you leave yourself with the freedom and flexibility to swap either out without much fuss.

Segmenting the application in this way also allows you to serve your API to multiple platforms. You can support a web client as well as a mobile app with the same API this way.

_However_, it gets tricky if you begin to incorporate template-engine rendered pages from your express app in addition to a React application. This may be the case in a site that you want to optimize with templated landing pages, and that also hosts a dynamic web application following user login.

Following the curiosity of exploring the later option, I'm going to dive into deploying my Express application with a React app from the same application server.

# File Structure

When starting from scratch, you'll want to initialize your express app at the root, and then the React app one level lower, within a `client` folder. It will look something like this:

```
.
├── .ebextensions/
├── modules/
│   └── post.html
├── client/
│   ├── build/
│   ├── public
│   ├── src
│   ├── package.json
│   └── package-lock.json
├── models/
├── routes/
├── modules/
├── package.json
├── Procfile
├── README.md
└── server.js

```

You'll notice two `package.json` files. Be mindful of what directory you're in when installing packages from the CLI.

You'll also see two items specific to our AWS setup: `Profile` and `.ebextension/`. More on those later!

# Proxy Express

In the React app, I have requests that use same-origin requests like so:

```
 axios
 	.get(`/api/${params}`)
 	.then((movies) => {
		const moviesObj = {};
		movies.data.forEach((movie) => (moviesObj[movie._id] = movie));
			this.setState({
				movies: moviesObj,
			});
		})
	.catch((err) => console.log(err));

```

Note the `/api/${params}` URL. Since we're serving from the same source, there's no need to express another origin in the URL.

That's the case in production, but we also have an issue locally. When we run Express and App in local development, it's typically with these npm scripts:

```
// package.json
{
	...

	"scripts": {
		"server": "nodemon server.js",
		"client": "npm start --prefix client",
		"dev": "concurrently \"npm run server\" \"npm run client\"",
	}

	...

}

```

A couple of less familiar pieces to explain:

The `--prefix client` is simply telling the terminal to run this script from the client/ directory, since that's where our React app is located.

**Concurrently** is a dependency that does just that: allows us to run both servers simultaneously form the same terminal. You could just as easily run them from separate terminals.

Either way, we have an issue of React listening on port 3000 and our server on a separate port like 4000.

We'll navigate both the local development and production issue with a proxy.

All we need to do is add a line to our React package.json.

```
// client/package.json

{
	...

	"proxy": "http://localhost:5000/",
}
```

This tells our react script to redirect any api calls to our server running locally on port 5000.

# Serving React Static Files

We're in the home stretch! Now all we need to do is adjust our express server to render React files when requesting the appropriate routes.

First, build the React application.

`$ client/ npm run build`

You can set up a build method in your npm script to run this when you deploy the application. That will likely be preferable since you'll be making updates to the React app. For simplicity here, this should get us up and running, though.

Doing this will populate your `client/build` folder with the assets for your React app. Great!

Now to wire our Express app to our static files.

There are two approaches to do this between production and development, but ultimately the core approach is the same. We need to add these key lines near the end of our application:

```
// Server.js

...

// Serve Static Assets if in Production
app.use(express.static(path.resolve(__dirname, 'client', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

// Ports

...

```

We're serving the static files from our build folder, and then any request that doesn't match any routes for our api higher up in the file will serve the index of our React app instead.

This will work fine in production when we configure our host to the same source. This, however, will override our concurrently running React app on port 3000 in local development.

To mitigate this, we just need to add a conditional statement:

```
// server.js

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('/var/app/current/client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

```

Easy! If in production, reroute requests to the index of our React app.

# Wrapping Up

And we're all set! So we've covered how to allow Express and React to communicate from the same source. Next we'll look at [how to configure this application for deployment to Elastic Beanstalk on AWS](/merneb).
