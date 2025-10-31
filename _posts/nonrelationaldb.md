---
title: Non-Relational Database is a Misleading Name
tags:
  - Tech
  - Database
  - MongoDB
  - SQL
date: '2023-03-16T10:35:07.322Z'
---

My intro to databases was through MongoDB. Coming from a web development perspective, it was comfy! Documents look and work like JSON objects. They're flexible and can adapt to changing schemas. I've enjoyed it!

I'm dipping SQL this week to broaden my horizons in data land. The first conceptual overview I got was this:

- SQL databases are Relational Databases
- Other database structures are Non-Relational, or NoSQL Databases

So are relationship structures exclusive to SQL?

## SQL

The "relational" distinction comes from the fact that data is stored within tables in SQL.

My e-commerce app would divide its data into three tables:

- User
- Items
- Orders

Each table for each would have data pertaining specifically to that category of data. They'd then be linked through a relationship.

Orders, for example, would have a many-to-many relationship with items. Many items can be in many orders. Many orders can have many items.

Users could have a many-to-one relationship with Orders. A user can have many orders, but an order is tied to only one user.

So when your querying the items in the user's order, SQL has to travel through a few relationships:

1. We start with the user ID
2. We query an order based on the user
3. We query items based on what's contained in the order
4. We get massage the data to show what's relevant to our query.

And thus, SQL gets the relationship monicker.

## MongoDB

What made this confusing at first is that MongoDB falls under the non-relational database category, but I can make these same queries in MongoDB as well.

[MDN has a terrific guide to Express and Databases](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs). When setting up the DB schema for MongoDB, [it's done with a relational structure](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose#designing_the_locallibrary_models). In their library example, there are schemas developed for books, authors, book instances, and genre. All of which are tied together through relationships. In mongo, the ID is used to connect these documents.

So the NoSQL descriptor is a more accurate lead. The query language is different, but relationships are still an offering in Mongo.

The non-relational categorizing, though, is somewhat fair: The main benefit of Mongo is that you can nest in one document what you would otherwise split between tables.

A user document can store their orders within a nested object in MongoDB. Depending on your application, you may not be accessing orders outside of the context of a query to the user. [Mongo has a clear healthcare example](https://www.mongodb.com/databases/non-relational) where patient information is stored in their document
