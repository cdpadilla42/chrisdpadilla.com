---
title: An Overview of Developing Slack Shortcuts
tags:
  - Tech
  - Python
  - JavaScript
date: '2022-10-14T05:35:07.322Z'
---

For simple actions, sometimes you don't need a full on web form to accomplish something. An integration can do the trick. Slack makes it pretty easy to turn what could be a simple webform into an easy-to-use shortcut.

It's a bit of a dance to accomplish this, so this will be more of an overview than an in depth look at the code.

As an example, let's walk through how I'd create a Suggestion Box Shortcut.

# Slack API

The first stop in setting any application up with Slack is at [api.slack.com](https://api.slack.com/). Here we need to:

1. Provide the Request URL for your API
2. Create a New Shortcut "Suggestion Box"
3. If loading data for select menus, provide an API URL for that as well.

You'll create a callback ID that we'll save for later. Our's might be "suggestionbox"

# Developing your API with Bolt

It's up to you how you do this! All slack needs is an endpoint to send a POST request. A dedicated server or serverless function works great here.

Here are the dance steps:

1. Instantiate your App with Slack Bolt
2. Write methods responding to your shortcut callback ID
3. Handle submissions.

There are multiple steps because we'll receive multiple communications:

Shortcut opens => Our API fires up and sends the modal "view" for the shortcut.

User marks something on the form => Our API listens to the action and potentially update the view.

User submits the form => Our API handles the request and logs a success / fail message.

[Bolt](https://api.slack.com/tools/bolt) is used here to massively simplify this process. Without Bolt, the raw slack API uses http headers to manage the different interactions. With Bolt, it's all wrapped up neatly in an intuitive API.

# Blocks

The UI components for slack are called blocks. There is a handy UI for creating forms and receiving the appropriate JSON [in their documentation](https://api.slack.com/block-kit). Several great inputs are included, like multi select, drop down, date picker, and several other basic inputs that are analogous to their web counterparts.
