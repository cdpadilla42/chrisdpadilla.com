---
title: Queues of Queues at the Grocery Store
tags:
  - Tech
date: '2026-03-31T07:44:39.322Z'
---

There's an idea that's tickled me lately — the idea that a queueing problem can sometimes be tackled by employing... _more queues!_

Looking at the world around us, in a small retail store, one cashier and one queue can suffice. But in a grocery store, that is typically insufficient. During peak hours, it takes multiple cashiers to check out customers with their own individual queues.

Interestingly, they are also self-organizing thanks to individual customers having autonomy in the line that they chose. A customer can look at all open cashiers at a glance, see how many people are in line, and even further — can see which ones are being clogged up (by customers with large baskets, customers paying cash vs card, customers searching glacially for all the coupons they clipped that morning).

Most stores have an element of prioritization based on the workload as well. Cashiers are great at handling shoppers purchasing food for the week. Self-checkout, which has its own queue, is best suited for those with < 15 items. There is an entirely separate queue for these shoppers.

You could get granular here — each shopper within their cart ultimately constructs a queue of items that are scanned in an arbitrary order.

There's even a dead-letter queue in many humble grocery stores! My local stores have a customer service desk where you can communicate with a manager who has the ability to review your order, what went wrong, and has extra permissions to resolve an issue.

---

This all, of course, maps to software.

In terms of systems:

- A food item is a task
- Shoppers are a collection of tasks that are scanned via queues
- Cashiers (and self-checkout machines) are workers
- Individual cashier lines are queues
- Human cashiers vs self checkout represents prioritization queues
- Customer Service is, as mentioned, a dead-letter queue

Is it overly obvious that I thought about this while standing, perhaps too long, in line at the store this weekend?
