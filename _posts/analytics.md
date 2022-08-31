---
title: Analytics - Accuracy and Ethics
tags:
  - Tech
date: '2022-08-31T05:35:07.322Z'
---

I don't personally use analytics on this site. I'm not here to growth hack my occasional writing for ad space. But I *am* involved in a couple of projects where analytics is good feedback for what we're putting out. So I did a little bit of a deep dive.

# Accuracy is Suspect

[Uncle Dave Rupert](https://daverupert.com/2022/04/server-side-vs-client-side-analytics/) and [Jim Nielsen](https://blog.jim-nielsen.com/2020/google-vs-netlify-analytics/) have striking comparisons between their different analytics services. The gist is that they are serving up WILDLY different data, telling different stories. 

It's not just that Netlify numbers are generally higher than Google Analytics, either. If you follow one service, the data could tell you that you had fewer visits this month, while the other claims you had more.

Part of this is because of the difference between how the data is gathered. 

Server Side Analytics measures requests. Client Side loads a script on page load.

There are pros and cons to both. Client side analytics can better map sources of leads and measure interactivity, but is prone to JS being turned off or plugins blocking their usage. Server Side is prone to inflated numbers due to bot traffic. 

So it seems like the best solution is to have multiple sources of information. Of course that extends to having more metrics than purely quantitative, as well.

# Privacy and Ethics

Tangentially, there are some ethics around choosing how to track analytics and who to trust with this.

It's an interesting space at the moment. [Chris Coyier of CSS Tricks has written some thoughts on it.](https://css-tricks.com/on-user-tracking-and-industry-standards-on-privacy/). I feel largely aligned. The gist is: aggregate, anonymous analytics is largely ok and needed in several use cases. Personally identifiable analytics are a no-no. 

> But I understand that even this “anonymous” tracking is what is being questioned here. For example, just because what I send is anonymous, it doesn’t mean that attempts can’t be made to try to figure out exactly who is doing what by whoever has that data.

This is key for me. History has told us that if we're not paying for a service, we are likely the product. And so, any analytics service that doesn't have a price tag on it to me is a bit suspect. 

I can't say I have any final conclusions on that matter. Nor any say that X is right and Y is wrong, I have no shade to throw. But as I step more and more into positions where I'm a decision maker when it comes to privacy, I'm working to be more and more informed, putting users best interests at the center.