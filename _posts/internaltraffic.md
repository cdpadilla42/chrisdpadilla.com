---
title: Excluding Internal Traffic in Analytics
tags:
  - Tech
  - Analytics
date: '2022-11-30T05:35:07.322Z'
---

It's not as clean as UA, sadly.

With Universal Analytics, [Google's own Opt-Out plugin](https://chrome.google.com/webstore/detail/google-analytics-opt-out/fllaojicojecljbmefodhfapmkghcbnh) worked nicely. Unfortunately, it doesn't seem to be configured to work well with GA4.

Julius Fedorovicius has a [fantastic article on what other options are available](https://www.analyticsmania.com/post/how-to-exclude-internal-traffic-in-google-analytics-4).

Google recommends filtering by IP address, but that's really not feasible with a company larger than 5 people!

The article walks through a great work around, exposing Google's `traffic_type=internal` parameter that it sets on events when there is an IP match.

The two options from there are to set this with either cookies or JavaScript. Both are imperfect in their own way, but all of these methods together end up being a useable solution.

**Update:** An alternate approach is to set the internal traffic from a custom event. If tag manager is already being used, it's likely there are custom events already set up for when an admin logs in. So you can trigger on admin login to set the internal traffic.

I can't recommend [Julius Fedorovicius' article](https://www.analyticsmania.com/post/how-to-exclude-internal-traffic-in-google-analytics-4) and site enough for all help on all the different growing pains from UA to GA4.

Here's hoping the ol' opt-out plugin gets an update sometime!
