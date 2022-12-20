---
title: Building a Full Stack MERN Events App
tags:
  - Tech
  - Project
  - React
  - Node
  - Express
  - MongoDB
  - AWS
date: '2022-05-13T05:35:07.322Z'
---

![Mystery Cowboy Theater Preview](https://padilla-media.s3.amazonaws.com/software-project-assets/mct-preview.png)

# Mystery Cowboy Theater

[Github](https://github.com/cdpadilla42/mystery-cowboy-theater-fullstack) | [View app in browser](http://mysterycowboytheater-env.eba-tdkgfkfh.us-east-1.elasticbeanstalk.com/theater/The-Domain)

Mystery Cowboy Theater is a fictional single screen theater that loves showing exclusively [Mystery Science Theater 3000](https://en.wikipedia.org/wiki/Mystery_Science_Theater_3000) films and episodes! This application displays a movie selector, current ticket order, and a movie editor.

This project fulfills all CRUD operations in two areas: ticket orders and films being screened. After being populated by the database, the application state is contained in the app component and data is shared down to the other supporting components to allow instant updating app-wide. State is maintained through two means: local storage for ticket orders and MongoDB for movie showings.

Tech used:

- React
- MongoDB
- Mongoose ORM
- NodeJS
- Express
- Custom SCSS
- Passport
- BcryptJS
- Deployed to AWS Elastic Beanstalk

# Back-End and Front-End Communication

My aim with this project was to bring together React and the Express backend into one application. Since my last major React project, I planned to add complexity with multiple components needing the same state data, making the project more modular, and hooking the app up with a database.

Structurally, the app is contained within one Node project, with the front end’s subdirectory being run through a specific script in the package.json file. Heroku, the deployment platform, runs this particular script so that it can build and serve up the React application for the client as well as run the Express application. The two points communicate with each other through a REST API served up by the Express server and queried by the front end with axios.

# A brief note about CORS

A challenge in the project was discovering that, although the application was wrapped in the same project, a way to handle Cross-Origin Resource Sharing was required to allow data to be passed from the client to the server. Thankyfully, the solution simply required bringing in a middleware package to handle this. Currently, the application does not use a custom options, however, a potential next step for a more robust application with sensitive data would be to specify approved origins with the CORS package configuration.

# Secure Authentication

Editing movies requires being logged in as the theater owner. There are both client and server side security measures to ensure that the appropriate user is authenticated before editing. While contained within the same project, the authentication process treats the front-end and back-end as separate entities needing to communicate with one another. The best solution for this was to use JSON Web Tokens. I’ve used Passport to implement the creation and authentication of the token that users send in request headers through axios. To ensure passwords remain secure, bcrypt was brought into the project to encrypt newly created passwords and decode login requests.

# Single App Hosting on AWS

This project is hosted as a single application on AWS through Elastic Beanstalk and updated with the Code Pipeline CI tool. You can read more about how I configured the project for AWS in my article [Hosting a Node Express App on AWS Elastic Beanstalk](/merneb). You can also read on the why and how of [Rendering a React App from an Express Server](/reactexpressapp).
