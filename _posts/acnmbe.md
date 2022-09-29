---
title: Using Sanity as a Level Maker
tags:
  - Project
date: '2022-09-27T05:35:07.322Z'
---

Something that goes under appreciated when it comes to developing anything — games, websites, music — is how much time goes into making the _tools_ that you need to make _your_ project.

Musicians familiarize themselves with scales and harmonic language.

Developers use libraries, frameworks, and even still, build their own reusable components on top of it.

And Game Makers develop level builders.

And so, that's what I did for my collaborative visual novel!

I mention in my previous article the why and how of choosing Sanity as our backend CMS. Here I'll be describing the though process behind developing the Schema for the game along with how some of that translated into the game.

# Schema Development

Sanity is a document based database. The structure is not too different from MongoDB. You have a collection of _documents_, which can have nested elements to them, and that can connect to other documents _relationally_. We have several collections for the game:

```
Content
├── Dialogue
├── Inquiry
├── Conversation
├── Emotions
├── Animal
├── Asset
├── Animal Images
├── Item

etc.
```

Here's an overview of the schema in action:

Conversations => Dialogue (contains phrases)

Phrase => Text => Speaker => Emotion.

Let's dive into a few to get a sense for the game's structure.

## Dialogue

The heart of the game is text. So this was a jam-packed Schema.

Dialogue objects look like this:

```
{
	name: String,
	Conversation: ConversationID,
	phrases: Array,
	responseOptions: Array,
	isFinalDialogue: Bool,
	...
}
```

There are a few other properties, but the important ones are displayed.

Each dialogue is linked to a **conversation**. The conversation is the equivalent of a whole scene with an animal, say, you talking to Ankha in the first act. Conversations are broken up into separate dialogues, with player responses being the separator.

Within each Dialogue is a list of **phrases**. A little More on those later, but essentially, these are the individual lines of text, about 2-3 sentences.

**Response Options** are displayed at the end, giving the player the chance to branch down multiple paths, if needed.

The last dialogue in a conversation is marked with as **is final dialogue** to signal to the game that it's time to transition to another page.

## Phrases

These are a subdocument, so they don't have their own collection. But, their schema is pretty interesting! A lot is packed in here:

```
{
	text: String,
	emotion: emotionID,
	speaker: animalID,
	centeredAnimal: bool,
	animalOrientation: "left" || "right",
	specialEvent: eventID,
	...
}
```

Again, a bit of a simplification here. But these are the main components:

**Text** to render, who is **speaking** so we can highlight their sprite and show their name in the dialogue box, and several other positioning properties.

Achievements, mission clearing, and being given an item is handled in our **special event** property. When the game comes across this point in the conversation, it looks up the event and has special logic for handling it.

## Linking Dialogues

Handling multiple branches took some doing, but stayed a lot less complicated thanks to the modular nature of our schemas!

As mentioned above, we're able to go down branching paths depending on the dialogueID that's linked to a given response option. This is also possible when presenting evidence.

There's a point in the game where it's a bit of a free for all. Animals can be asked about any item in the users inventory, sometimes providing different dialogue depending on what the user has already achieved in the game. Implementation here was largely similar to the above - link items to a specific dialogue document. BUT, if a prerequisite event is required to see a secondary response, make that check first.

The nitty gritty of that implementation is too large for a single blog post. It all comes back to this main implementation of separate dialogues linked relationally by items or response options.

# Customizing the Back End Client

Sanity Studio was great to work with! Even for contorting it to suit our needs for level building, it was flexible enough to accommodate us.

Here's a quick peak at what a dialogue document looked like in Sanity:

![Sanity Studio](https://padilla-media.s3.amazonaws.com/blog/acnm/Screen+Shot+2022-09-22+at+12.05.36+PM.png)

## Conditionally Rendering Input Elements

We had a few situations of "If prompting for evidence is true, we also need these fields to show."

Sanity also handled this really nicely! It came in handy as a reminder to Jenn what was and wasn't needed in certain game scenarios by having the back end client nudge her in the right direction.

Here's an example of what this looks like in Sanity's schema, from their [documentation](https://www.sanity.io/docs/conditional-fields)

```
{
  name: 'link',
  type: 'object',
  title: 'Link',
  fields: [
    {
      name: 'external',
      type: 'url',
      title: 'URL',
      hidden: ({ parent, value }) => !value && parent?.internal
    },
    {
      name: 'internal',
      type: 'reference',
      to: [{ type: 'route' }, { type: 'post' }],
      hidden: ({ parent, value }) => !value && parent?.external
    }
  ]
}
```

# Wrapping Up

There was a fairly large upfront cost of planning out how to structure the game and enable Jenn to add in assets and story. We saw it evolve pretty quickly as the game grew and grew in complexity. Taking that time upfront helped save a lot of headache down the road! I'm grateful to have used a system that was resilient enough to change as our needs inevitably pivoted.

I hope you check out [AC: New Murder](https://acnewmurder.com)!

If you're interested in reading more about the nitty gritty of developing the tech or how I managed the project, you can read my deep dive on each below:

- [Overview](/acnmp)
- [Developing a Game in React](/acnmfe)
- [Project Management for Game Development](/acnmpm)

You can also follow Jenn's art and work from her [site](https://www.jennpadilla.com/) or [twitter](https://twitter.com/jennpadillart)
