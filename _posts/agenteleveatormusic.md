---
title: AI Agent Elevator Music
tags:
  - Clippings
  - Tech
date: '2025-12-01T16:37:45.322Z'
---

<figure>
![Woman With A Guitar, Raimundo de Madrazo y Garreta (Spanish, 1841 - 1920)](https://padilla-media.s3.amazonaws.com/blog/images/agenteleveatormusic.png)
<figcaption>[Woman With A Guitar](https://artvee.com/dl/woman-with-a-guitar/), Raimundo de Madrazo y Garreta (Spanish, 1841 - 1920)</figcaption>
</figure>

[Matt Webb shares via Interconnected](https://interconnected.org/home/2025/09/18/muzak) Mike Davidson's [Claude Muzak](https://github.com/mikeindustries/Claude-Muzak):

> I suggested last week that Claude Code needs elevator music…
>
> Like, in the 3 minutes while you’re waiting for your coding agent to write your code, and meanwhile you’re gazing out the window and contemplating the mysteries of life, or your gas bill, maybe some gentle muzak could pass the time?

_Delightful_.

A few tracks are already provided, you'll have to bring your own audio files for more varied listening. [Music For Local Forecast](/musicforlocalforecast). Or perhaps [anything Vaporwave](https://fmskyline.bandcamp.com/album/illuminations)! And all sorts of [library music](/librarymusic) comes to mind.

For more whimsy, 1950's era incidental music would also be a terrific fit. Eons ago in internet years, there was a great collection of public domain light music tracks that were used for [Ren & Stimpy](https://secretfunspot.blogspot.com/2006/11/ren-stimpy-production-music.html), but download links are no longer handy.

A few finds from the internet archive that should fit the bill:

- [The Music of Raymond Scott](https://archive.org/details/the-music-of-raymond-scott-reckless-nights-and-turkish-twilightsdeluxe-edition/1-09+Hypnotist+in+Hawaii.mp3), composer of the tune Powerhouse, of Warner Bros. cartoons fame.
- [Pink Champagne: A Collection of Vintage Light Music](https://archive.org/details/pink-champagne-a-collection-of-vintage-light-music), perhaps our closest replacement for the Ren & Stimpy Production Music collection.
- [Music To Knit By](https://archive.org/details/lp_music-to-knit-by_the-golden-strings-arnold-eidus), humorously reminding me that the themed music streaming playlists are part of a long tradition of pragmatically curated music. Another era's _Lofi Hop Hop Beats To Relax/Study To!_
- [Music by Candlelight at Teogra](https://archive.org/details/lp_music-by-candlelight-at-teogra_eugene-jelesnik-carlos-arroyo), classical guitarist & violinist provide easy listening to diners of the titular restaurant, recorded for your listening pleasure.

---

As a technical aside, this is a very slick use of [Claude Code hooks](https://code.claude.com/docs/en/hooks-guide). Common productive examples could be cleanup scripts, including a rules.md with your prompt, applying code formatting, etc. Nice to see such a fun use!

```json
// .claude/settings.json

{
  "UserPromptSubmit": [
    {
      "hooks": [
        {
          "type": "command",
          "command": "python3.11 /Claude-Muzak/claude_muzak.py hook start"
        }
      ]
    }
  ],
  "Stop": [
    {
      "hooks": [
        {
          "type": "command",
          "command": "python3.11 /Claude-Muzak/claude_muzak.py hook stop"
        }
      ]
    }
  ]
}
```
