---
title: Building a Full Stack Next.JS E-Commerce App
tags:
  - Tech
  - Project
  - React
  - Node
  - GraphQL
date: '2020-12-13T05:35:07.322Z'
---

![Taco Time Preview](https://padilla-media.s3.amazonaws.com/software-project-assets/tacotimepreview600.png)

# Taco Time

[Github](https://github.com/cdpadilla42/taco-time-nextjs) | [View app in browser](https://taco-time-nextjs.vercel.app/)

Taco Time is a fictional restaurant taking inspiration from Taco Deli here in Austin, TX. With the need to showcase and allow customers to order an array of breakfast and lunch tacos, this application dynamically renders item pages and maintains a detailed cart that stores their orders and customizations. This intricate project employs multiple modern web development tools and techniques, including Server Side Rendering, interacting with a GraphQL API, running server-less functions, and dynamically rendering individual item pages with Next JS’s dynamic routes. Tech used:

- Next.js
- React
- Redux
- GraphQL
- MongoDB
- Mongoose ORM
- Apollo Micro Server
- Apollo Client
- Styled-Components
- React-Transition-Group
- Stripe
- Deployed to Vercel

## Server Side Rendering with Next.js

Next.js allows for choosing between Server Side Rendering and Static Page Generation on a page-by-page basis. For this application, assuming owners may need to post notice that an item has sold out, I’ve opted for SSR. On the server, the application grabs the data it needs and renders the html that will be sent to the client. This process alone took a considerable amount of fine tuning as the application needs to interact with Apollo’s cache and await results from MongoDB. I was able to eradicate a bit of a nasty bug in this process by having the getServerSideProps function wait for the DB to establish a connection before rendering the page.

## Crafting API Resolvers in Apollo

The back end is an Apollo Micro Server. Since this iteration of the app only needed to interact with MongoDB to fetch items in the restaurant inventory, a lighter server seemed a great fit! The server takes in hand-crafted GraphQL schemas and resolvers. The resolvers then fetch the data from MongoDB through interacting with Mongoose schemas. A mutation method was implemented for me to add items to the database as a developer. A possible expansion would be to create a view for restaurant owners to interact with an elegant UI to do this themselves.

## Integration with Stripe API for Customer Checkout

The latest feature and my favorite to work through was bringing in Stripe’s checkout component and integrating with their api to charge credit cards for orders. In this implementation, testing mode is enabled so no charges are actually incurred, but test data is sent through the application. (Use card number 4242 4242 4242 4242) To ensure a secure checkout, the order is handled on the server. There, prices are recalculated with price information on items from the database to ensure correct charging. The order is then converted to a record in the database. Finally, an order is returned to the client with details on their purchase.

## Interacting with GraphQL API

To interact with the API, Apollo Client is used within the SSR functions. To allow for flexibility, the client initialization method is written to check for whether it is being used on the server or client. The benefit of only grabbing the relevant data is best seen between the menu page and an individual items page. The menu only needs the name, image, description, and category of an item. The GraphQL query then only requests what it needs. The full item display pages, then, will request further data, such as customizations, options, and price.
