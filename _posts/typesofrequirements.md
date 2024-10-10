---
title: 3 Types of Software Requirements
tags:
  - Tech
  - Architecture
date: '2024-10-10T10:35:07.322Z'
---

This week I'm synthesizing notes from Michael Pogrebinsky's course on [Software Architecture and Design](https://www.udemy.com/course/software-architecture-design-of-modern-large-scale-systems/?couponCode=ST14MT101024). If you like what you read below, you'll love the course!

---

When designing a system, especially at higher scales of complexity, it's vital to take the carpenters' motto to heart: _"Measure twice, cut once."_

Smaller scale projects, such as feature requests for an already existing system, have very clear restraints. The programming language, platform, and infrastructure of the project have already been laid. It only takes a few questions to get clear on what needs to happen when adding a widget to an existing app.

Larger solutions, however, can be daunting with the sheer vastness of options. Any software choice can solve any problem. And, in spite of what the discourse on forums may lead you to believe, there isn't _one_ correct solution for any problem.

So how do you narrow down your choices? Through requirement gathering!

## Requirements As Part of the Solution

A paradigm shift for anyone pivoting from a small scale environment to thinking broadly is understanding that question asking _is_ part of the solution. 

The client, sometimes not technical, will have an idea of the problem they want to solve, but will be unclear on the solution. Even if they have an idea of what solution they would like to see implemented, you as the technical authority in the room have to ask clarifying questions to find out if their suggestion will work in your system.

## Types of Requirements

To help ensure time is spent asking the right questions, it's helpful to know that there are three types of requirements you can gather:

- **Functional Requirements:** Features of the system. Think inputs and outputs. Listen for "the system must do this"
	- Generally, these do not determine the architecture. Any architecture can solve any problem.
- **Quality Attributes:** Non-functional requirements. Deals with performance of the application. Listen for "the system must have".
	- Ex: Scalability, availability, reliability, performance, security. [A more comprehensive list here](https://en.wikipedia.org/wiki/List_of_system_quality_attributes).
	- _These_ dictate the software architecture of our system. 
- **System Constraints:** Limits and boundaries. 
	- Ex: Time, staffing, resources. Can also drive architecture design.

## Example: CD Dad

Say you're working with a client that is looking to build out an e-commerce platform for musicians. A possible portion of requirements may include the following:

> "CD Dad will host albums from independent musicians. When a customer purchases an album, the customer will receive a digital download of the album and the musician will be paid."

So far we've heard the Functional requirements. With given inputs, the system hosts the music. When a customer submits a purchase, they receive the digital downloads. 

> "Processing uploads should be take no longer than 5 minutes. When an album is purchased, a link should be made available immediately through email."

The statement above relates to performance of the app, so this is a quality attribute.

> "The system should support mp3, wav, and aif file formats. A team of a dozen full time engineers will be responsible for maintaining the system."

Now we're talking file formats and engineering support, so we're looking at System Constraints.

## The Joy of Constraints

For many engineers, an ideal world is one without constraints. However, limitation breeds creativity. A limit on resources, hands on deck, and time are what enables us to ship code regularly.

In the event that any of this information is missing in your understanding of a system, it's an opportunity to gather more info and clarify what's being built. Doing so will help clear the fog for the next best step.