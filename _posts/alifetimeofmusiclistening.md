---
title: A Lifetime of Music Listening
tags:
  - Notes
  - Music
  - This Website
date: '2026-02-27T12:52:45.322Z'
---

![Music grid for days](https://padilla-media.s3.amazonaws.com/blog/images/musicshelfscreenshot.png)

_In short — I made [a new webpage](/musicshelf) to chronicle my listening history. Woohoo!_

---

In the distant past of 2010, I distinctly remember two things:

1. Reading headlines on LifeHacker about a neat new service making a splash across the pond called Spotify — where you can legally stream a seemingly infinite library of music.
2. From that same evening: ripping Plastic Beach by the Gorillaz onto my computer, loading it into my iTunes library, and transferring it to my iPod.

A year later, I was shocked by the instantaneousness of having access to all music ever recorded.

15+ years later, I find my relationship with listening to music vastly different from those days. Teen-specific sentiments aside! I'm listening to a broader range of music, going deeper into sub-genres, and have heard international artists I otherwise would have never been exposed to. That's all good and well!

At the same time, I find myself not listening as deeply, not listening to whole albums, and allowing a large portion of my listening to be guided by unseen forces. Perhaps the pace of life has changed this, perhaps age, perhaps the coming and going of fascinations and interests.

Whatever the reason, I had a moment ripe for reconsidering my listening habits and the technology that supports them.

## CDs

Visiting my childhood home, I found stowed away a bunch of physical CDs that I hadn't thought of, let alone heard, in ages. Tucked in jewel cases, some in plastic sleeves from friends who burned playlists for me, nostalgia ensued. I popped several into a physical CD player. (One of those big 2000s era boomboxes was available. After that, I popped one into my car. Being built in 2016, it still has a CD player.) I felt the nearly forgotten anticipation of waiting for the music to start, the tactile satisfaction of placing media into it's reciever.

Seeing a natural trail of my listening history in physical form, I realized this sort of thing was too important to me to leave it to chance, tech companies that come and go, etc. I enjoyed being curious about what caught my ear, collecting it as a source of inspiration, and saving it in a way that it can serve as a time capsule later. There's a seeming urban legend about how Andy Warhol would wear a different perfume daily for a couple of months so that he could then remember that point in time. Music has a similar effect; it's a great memory maker.

Unfortunately, physical CDs are not the answer. I found out all too soon that my favorite Japanese City Pop CD's would be $30 each + international shipping. Too many recent favorites don't do print runs of their music. Even so, the practical reality is that most of my listening is done through apps. A physical purchase would be reserved for special albums, not for the entire collection.

It begged the question — what was I really trying to accomplish? If it were to be more intentional about my listening and saving my listening, the nerdiest answer I could come up with was _a webpage_. I had remembered those times curating my iTunes library intentionally, and I was suddenly interested in doing the same on my own domain.

## The Data Wrangling

The development was largely trivial — the project's meat was in data collection and cleanup. I had to pop my physical CD's into a spreadsheet. But that only accounted for a fraction of my listening. It took crawling my iTunes library from ~2012 when I made the switch to streaming, as well as [exporting my Spotify playlist data](https://exportify.net/).

With that done, several rounds of lassoing data ensued. More memories came flooding back — it took considerable effort to keep good hygiene with an iTunes library. It's easy for naming conventions to get off, for the same artists to have different names based on stylization (ex: Arcade Fire and The Arcade Fire, or Tune-Yards and tUnE-yArDs), and for album art to be inconsistent. At times, it was frustrating. Now, though, it was the right amount of resistance to help me slow down and really savor the collection as a whole.

Tagging by year listened was a goal, as this was meant to reflect a timeline of listening. The 2000's required big ol' estimates, while for 2016 on I could use Spotify listening data.

While I was at it with my exported Spotify data, I decided to transfer over the top songs by year. This feature is universally beloved — I listened to my first (2016) playlist for years after the fact. Spotify doesn't cover the entire landscape of my listening, but it'll do. Those tracks were tossed into JSON and are now listed under [/topsongs/{year}](/topsongs/2025).

Violà! A full day's effort later, and I have 930 albums listed on [my new Music Shelf page](/musicshelf). I know that to most readers this is just a list of albums. But for the curator, this is a delightful wall of memories and favorite melodies that spans a mile long.

---

The page itself is simply a list with cover art, album, and artist. Of course, there's more I could do. Were I feeling particularly clever, I could whip up integrations with Spotify for further automation. BUT! The point is for this to be manually maintained. To have a process that even, ever so slightly, resembles the modern-day equivalent of getting into the car, driving to FYE, walking through the stacks, making a selection, bringing it home, and _THEN_ putting it on the shelf. It allows time to [live more deeply](/opportunitytolivedeeply) with the music.

Will this change my listening? It already has. Metaphorically, I've gone from only ever listening to the radio to finding my favorites and spinning them on repeat. Even without abandoning Spotify ("[Yet you participate in society](https://i.imgur.com/sl3fXat.jpeg)"), I have a reason to manually add albums, skip the MASSIVE UI encouraging I hop to the next listening destination right away, and get to know albums better. (Significant for me, since for a time I was almost exclusively [listening to algorithmically suggested tracks](/weeklyplaylist) before it got to be too much like the snake eating itself.)

The aim is to balance the best of both modernity and older practices. Like any choice around modern technology, our approach informs the tools we use and how we use them, not vice versa.

[✌️](https://www.youtube.com/watch?v=EOj0EU4IaPg)
