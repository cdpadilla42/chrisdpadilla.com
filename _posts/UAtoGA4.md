---
title: Migrating Tag Manager to Google Analytics 4
tags:
  - Tech
  - Analytics
date: '2022-11-28T05:35:07.322Z'
---

# Code Set Up

If you're using Google Tag Manager, you are already set up in the code to be funneling data to GA4. Alternatively, you can walk through the GA4 Setup Assistant and get A Google Site Tag. It may look something like this:

```
<script async src="https://www.googletagmanager.com/gtag/js?id=G-24HREK6MCT"></script>
<script>
	window.dataLayer = window.dataLayer || [];

	...

	gtag('config', 'UA-Something")
</script>
```

Two things are happening - we're instantiating the google tag manager script, and we're creating a dataLayer to access any analytics information.

The `dataLayer` is good to note because we actually have access to this at anytime in our own code. We could push custom analytics events simply by adding an event to the `dataLayer` array, such as `window.dataLayer.push('generate_lead')`

# Tag Manager

If you're already using Tag Manager, you'll want to 1. Add a new config for GA4 and 2. update any custom events, converting them to GA4 configured events.

1. Set up GA4 at analytics.google.com
2. Take your GA4 ID over to Tag Manager and create a new GA4 Config Tag.
3. Use that config tag in your new custom events.

It's advised to keep both GA4 and UA tags running simultaneously for at least a year to confirm there's enough time for a smooth migration. Fortunately for us, it's easy to copy custom event tags and move them to a separate folder within tag manager.

# Custom Event Considerations

## Dimensions & Metrics

GA4 has two means of measuring custom events: as **Dimensions** or as **Metrics**. The difference is essentially that a dimension is a string value, while a metric is numeric.

More is available in [Google's Docs](https://support.google.com/analytics/answer/10075209).

## Variables in Custom Events

Just as you had a way of piping variables into Category, Action, Label, and Value fields in UA, you can add them to your custom events in GA4.

GA4 has a bit more flexibility by allowing you to set event parameters. You can have an array of parameters with a name-value pair. So on form submit, you could have a "budget" name and a "{{budget}}" value on an event. As we alluded to above, you can provide this by manually pushing an event through your own site's JavaScript.

## Resources

[Analytics Mania](https://www.analyticsmania.com/) has a couple of _very thorough_ articles on [migrating to GA4](https://www.analyticsmania.com/post/upgrade-to-google-analytics-4/#different) and [testing your custome events in Tag Manager](https://www.analyticsmania.com/post/how-to-track-events-with-google-analytics-4-and-google-tag-manager/).
