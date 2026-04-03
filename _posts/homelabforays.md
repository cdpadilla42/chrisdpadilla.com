---
title: Forays Into Home Lab Apps
tags:
  - Tech
date: '2026-04-03T12:03:24.322Z'
---

I'm dipping my toes into the rabbit hole of Home Labbing (or, perhaps, am tripping down the loose gravel that is rapidly dropping me down into the vast expanse of it!)

I've seen discourse around Synology setups, home NAS systems, and really sophisticated data back up stragies. This just seemed right up my alley — the intersection of managing apps, data, and oh — by the way — that data can include all sorts of stuff I care about: my ripped CDs from the 2000s, my collection of ebooks, _and_ pictures from all of my vacations??

I'll hit the highlights — my _laughably minimal setup_ as I'm just getting started, the apps I'm running, and my two cents on the experience so far.

## The Setup — Keeping It Simple

So far, the number of people who care about this in my household is 1 — me. I have little need for the N in NAS (Network-Attached Storage) and am having fun setting things up on my laptop.

That said, a DAS (Direct-attached Storage) box is out of the budget while I'm just experimenting. A NAS can run $1,000, while a DAS trails behind _slightly_. Not the price point for a maiden voyage.

Those deeply entrenched in this hobby may scoff at this, but my current solution is — drum roll please — _an external hard drive_. I simply slap this into my computer directly, run all my apps on my machine, and then access them on the same machine.

This skips over a lot of what looks fun for a maturing setup: building a machine, ordering parts, setting up the network, getting an Uninterruptible Power Supply, etc. But I was starting to get educated with all of this only to realize it was keeping me from getting started in the first place.

So yes, I'm excited to eventually have hardware to talk about and neat networking approaches at a later time. But for now, keeping it simple is keeping me moving.

Worth saying: I have employed for [a while now](/databackup) the [3-2-1 backup strategy](https://en.wikipedia.org/wiki/Backup). I have a primary drive, a mirrored drive, and have the primary backed up to the cloud via [BackBlaze](https://www.backblaze.com/). Wes Bos gives a great pitch for [why he uses BackBlaze on Syntax](https://syntax.fm/show/220/the-synology-show-backups-and-home-server).

Now is also a good time to shout out [FreeFileSync](https://freefilesync.org/), a handy bit of OSS that I've used since 2010. This helped with migrating files and currently makes keeping drives in sync painless. It's manual, but it still works wonderfully. I've also picked up [DaisyDisk](https://daisydiskapp.com/) for getting a visual on what's taking up how much space on any given drive.

## Apps!

Pretty much all of these are run as Docker Containers on my machine, keeping themselves contained and incredibly simple to set up. I'm just wrapping up getting each populated with data, and for the most part, all you need to do is point it to the directory you want data pulled from, and then you're done. There was no issue with having the app on my machine and the data on another drive, so long as it's connected, of course.

Here's what I've got so far:

- **[📸 Immich](https://immich.app/)**: _The_ alternative for Apple Photos and Google Photos. I've enjoyed it so far. The face-detection AI for grouping photos by person is a slick feature.
- **[📺 Tube Archivist](https://www.tubearchivist.com/)**: Designed for backing up YouTube videos. I was previously doing this manually with yt-dlp, but this app sits on top and enables a very clever way of managing multiple downloads with plenty of automation baked in. Includes an interface for watching, as well. One of my favorites!
- **[🪼 Jellyfin](https://jellyfin.org/)**: Plex is the popular choice for media streaming, but I was interested in going forward on all OSS, so Jellyfin was the pick for hosting movies, shows, and my music library. In addition to the web client, it comes with native mobile apps that support downloading locally. I... don't actually watch a ton of movies or shows. But it's been great for hosting my music library!
- **[📖 Kavita](https://www.kavitareader.com/)**: I gave [BookLore](https://github.com/herraristotle/BookLore) a try, but it seems to be collapsing rapidly. As a comics enjoyer, I liked the looks of Kavita. It groups books within a series rather nicely. And, of course, handles books of words just as well.
- **[🐼 Monica](https://www.monicahq.com/)**: Monica is a CRM for friends and family. Having a personal database is a great container for keeping track of the people that matter most in your life. For a while now, I've taken [Derek's advice](https://sive.rs/dbt) on this practice, and Monica is actually one of his recommended solutions. Have only used it lightly so far, but it's been the most fulfilling hands down.

## How It's Going So Far

This has been supremely enjoyable on many fronts!

Parsing data, collecting it, reorganizing it, and digging deep into my own personal archive has been naturally nostalgic. Plenty of "wow, I forgot all about this!" arose along the way. This goes for my personal photos, [music collection](/alifetimeofmusiclistening), and even YouTube series that I previously enjoyed. [Tending the garden](/makingtagpages) allows us to "live twice," enjoying the highlights all over again.

Data loss is something I've been burned by before. Growing up, my own technical experiments pushed our Windows 98 machine to breaking a few times, to the point where the only solution was a clean install. On the subject of YouTube in particular, I've been frustrated to see videos disappear for one reason or another. Setting up this homelab of sorts only further solidified my own backup strategy, and now more easily facilitates backing up other ephemeral media.

On top of that — I'm much more likely to actually engage with what's stored as well! These apps provide an enjoyable interface that actual keeps me coming back. A huge improvement from finder!

And, of course, as a technologist, the setup is the most fun part. Along the way, I've spun up Docker Containers, written migration scripts, used new CLI apps, and just had a ball on the computer! It's exciting (daunting? terrifying?) that there's much more to do in the realm of hardware in this space, and I'm looking forward to branching out that way when the time comes!

I share this not to impress anyone with how tricked out my setup is (clearly), but to encourage you. If you're looking to get going, you don't have to wait for hardware. Roll up your sleeves and start tinkering!
