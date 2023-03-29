---
title: Ren'Py v Making a Game with React
tags:
  - Tech
date: '2023-03-29T10:35:07.322Z'
---

Have you ever wanted to make a game? Is it a visual novel?! You could do what I did and use web tech to build the game from scratch. OR you could use [Ren'py](https://www.renpy.org/doc/html/index.html)!

We made [AC New Muder](/acnm) in React, Node, and Sanity. I learned a TON, and I'm a better developer for having done it!

But, I am tempted to daydream about what it would have been like to lean on an actual game making tool.

As far as I can tell, you barely even need to know Python to get started! Here's what a script looks like from [the docs](https://www.renpy.org/doc/html/quickstart.html#releasing-your-game):

```
define s = Character('Sylvie', color="#c8ffc8")
define m = Character('Me', color="#c8c8ff")

label start:

    s "Hi there! How was class?"

    m "Good..."

    "I can't bring myself to admit that it all went in one ear and out the other."

    s "Are you going home now? Wanna walk back with me?"

    m "Sure!"

```

We actually considered using this at the start. What stopped us ultimately though was flexibility. I think an interactive map, item storage, and health were not a part of the scope of a tool like this.

**AND**, we wanted it to be on the web!! Ren'py has great Windows support, potentially less Mac support. For our case: having to download a game like this, launching it on Steam — that would be complicated since our game is based on Nintendo's characters. We wanted an early 2000's flash games feel. We both have a VERY soft spot for those games!

So, it's nice to dream. Maybe next time! But I'm really grateful we used the web platform.
