---
title: Hosting a Node Express App on AWS Elastic Beanstalk
tags:
  - Tech
  - Node
  - AWS
  - Architecture
date: '2022-12-15T07:35:07.322Z'
---

Heroku has discontinued their free hosting tier for web applications. A major disappointment for many a side-projector! Several of my first web apps were still being hosted on Heroku, so it was time to re-evaluate.

There are a few other options. Render and Digital Ocean have low cost options. As you can tell by the title of the article, though, I felt it was time to explore hosting on AWS.

# Elastic Beanstalk

There are a few options for hosting:

- Running the server as a Lambda function
- Hosting the server on an EC2 instance
- Managing load balancing and scaling with Elastic Beanstalk

For those unfamiliar:

- **Lambda functions** are AWS's solution for _Serverless Functions_
- **EC2 (Elastic Compute Cloud)** is a _hosting platform_ for cloud computing
- **Elastic Beanstalk** is an _orchestration service_ that wrangles EC2, S3s, CloudWatch, Elastic Load, and many other good-to-haves in hosting an application

So, maybe it's unfair to say these are different options: Technically Elastic Beanstalk will make use of an EC2 instance with several other goodies baked in to handle the need to up and down scale my apps as needed.

I'm throwing in running the server as a lambda function as a fun idea. I'm not caching on the server directly, so it's potentially an option. However, I wanted to start with a more direct and traditional approach so that I have the experience for larger applications that require a regularly running server.

For quick implementation and a nice learning opportunity, I opted for Elastic Beanstalk.

# Code Pipeline

My CI/CD needs are pretty minimal for my old portfolio projects, but nonetheless, I like being able to push to Github and then let the deploy happen automatically. So I'm setting up my EB applications with code pipeline connecting to my repositories as well.

# Set Up for AWS

There are a few things we'll want to do to prepare for deploying to AWS:

1. Match port number to the Internet port
2. Ensure the version of Node is within AWS's accepted range
3. Generate static files
4. Alias the route to our static files
5. Include a Procfile for defining start script

In another article, I'll go into the details of generating and routing to our static files. For now, let's look at what getting an Express server that renders templates would look like with the first two steps.

## Match Port Number

If we use the typical fallback port for servers in local development: 3000, 5000, or 7000, you'll run into an Nginx error with status code 502: bad gateway. To prevent this, we have to set our default port number to 8081, the port typically used for HTTP protocols.

Depending on how your express app is structure, this can be updated in the `bin/www` file:

```
// bin/www

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '8081');
app.set('port', port);

```

Or in your server file directly:

```
// server.js

const port = process.env.PORT || 8081;

app.listen(port, () => console.log(`Server started on port ${port}`));

```

## Match Node Version

The apps I worked with were from several years ago. And things have changed! I had to bump up multiple node version to comply with the AWS environment. This is done easily in the `package.json` file. It's worth verifying that your app is still running after making these changes and switching your local node with Node Version Manager:

```
// package.json

{
	...
	"engines": {
		"node": "^16.0.0",
		"npm": "6.13.4"
  }
}

```

# Deploying

You have a couple of options for deploying: Downloading the EB CLI, or using the web console. The web console is fairly straightforward and allows for easily bouncing between code pipeline, your application, and the environment generated from there. [This guide](https://aws.plainenglish.io/the-complete-guide-to-deploying-node-express-app-to-amazon-elastic-beanstalk-using-github-pipeline-b36eada99cac) will get you there.

# More To Come

So that's getting an Express app up on Elastic Beanstalk! Next time I'll talk about [bringing in React within the same project](/reactexpressapp) and the pitfalls to watch out for.
