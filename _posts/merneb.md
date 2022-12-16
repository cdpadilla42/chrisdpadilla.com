---
title: Hosting an Express Rendered React App on Elastic Beanstalk
tags:
  - Tech
  - React
  - Node
  - AWS
  - Architecture
date: '2022-12-16T05:35:07.322Z'
---

I'm picking up the story from [this article on moving my old projects from Heroku to AWS](/reactexpressapp). Previously, I covered [how to setup an Express app in Node for deployment to Elastic Beanstalk](/awseb). This time, we're going to look at wrangling in a React app served from an Express app all in one application for Elastic Beanstalk.

# Config Files

There are a few config files we need to set up for production on Elastic Beanstalk:

## proxy.config

When [setting up our Express App to serve React](/reactexpressapp), our server port may have been 4000 or 5000. But when [setting up an Express App for Elastic Beanstalk](/awseb), we used 8081, the port reserved for HTTP calls, in our CRA proxy. We did this to avoid the Nginx 502 status code. So here, my React proxy will utilize that same port:

```
// client/package.json

{
    ...

    "proxy": "http://localhost:5000/",
}
```

There's a bit of murky documentation and understanding in this realm, but there's another way to adjust this for production through a `.ebextensions/proxy.config` file. If you want to run port 4000 for the server in local development and configure your application to route to the same port in Elastic Beanstalk, you can do just that.

My solution required both setting my port to 8081 and including the `proxy.config` file, though my understanding is you _should_ be ok with just one or the other. In my case, I was able to test locally with the port set to 8081, so I had no qualms using it, though I know it's meant to explicitly stay open for other purposes. This portion will be a chose your own adventure!

You can follow [this AWS doc](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/nodejs-platform-proxy.html) on setting up the `poxy.config` with this added line:

```
// .ebextensions/proxy.config

files:
	  /etc/nginx/conf.d/proxy.conf:

	  	...

	  	 content: |
			upstream nodejs {
			server 127.0.0.1:8081;
			keepalive 256;
		}

```

One other portion is important for serving React static files: creating an aliast for our build folder.

By default, aws will search for static files at the root. The path will look like this:

```
/var/app/current/static;
```

Our's will be nested within our application, though. So we'll want to add this adjustment as well:

```
location /static {
  alias /var/app/current/client/build/static;
}
```

## Procfile

Supposedly, Elastic Beanstalk knows to use npm start by default when working with a Node environment.

Continuing with the murky documentation from earlier, this wasn't the case initially when I first uploaded the project. Adding a Procfile seemed to move the needle for me. It's a simple addition to the root of the project:

```
// Procfile

web: npm start

```

YMMV here, most dialogue around this actually pointed to this as an outdated solution. It may work for your case, however, as it did for me!

# Deploy!

Just as before, you should be set to deploy either through the EB CLI or from the AWS Console. [This guide](https://aws.plainenglish.io/the-complete-guide-to-deploying-node-express-app-to-amazon-elastic-beanstalk-using-github-pipeline-b36eada99cac) mentioned previously will get you through the console.

And that's it! We're set to work with React and Express side-by-side within one host in the cloud!
