---
title: Automatically Saving Spotify Weekly Playlists
tags:
  - tech
  - python
date: '2022-08-08T05:35:07.322Z'
---

With friends, I've been talking for ages about how channels of communication have different feelings and expectations around them. Sending a work email feels different from sending an instagram DM, which feels different from texting, which feels different from sending a snap on Snapchat.

For me, the same is true for music apps. I have Spotify, Tidal, Bandcamp, and YouTube accounts with different musical tastes and moods. Especially since these apps all have algorithms for recommending music, I like each to be tuned into a certain mood.

It just feels strange having a Herbie Hancock album recommended next to the new Billie Eilish, even though I would listen to both!

SO I have my Spotify Discover Weekly playlist _fine tuned_ to curate a great mood for work with mostly instrumental music. BUT I have to manually save the playlist every week, or else it's gone to the ether.

Naturally, I was looking to automate the process! Having worked mostly in JavaScript and React so far, I saw it as a great chance to explore scripting in Python.

## What It Does

This light script does just a couple of things.

Of course, it gets and reads the current Discover Weekly playlist data, creates a new playlist, and adds all the new tracks to that playlist.

It also implements a custom naming convention. I have sock-drawer-level organization preferences for naming these playlists. I like to name these by the first track name and the date the playlist was created. Names end up being:

- An Old Smile 04/05/22
- Mirror Temple 03/28/22
- Apology 3/21/22

This includes a little bit of trimming – Some track names end up being ridiculously long, sometimes nonsensicle. (looking at you, [⣎⡇ꉺლ༽இ•̛)ྀ◞ ༎ຶ ༽ৣৢ؞ৢ؞ؖ ꉺლ](https://open.spotify.com/artist/1TIbqr0x8HoKzKBNtNN8wf), an _actual_ artist recommendation.) So there's a very simple shortening of the name if needed.

## Using Spotipy and the Spotify Web API

Spotify already has an exposed web API for doing just what I needed – creating playlists and adding tracks. Doing so, like other OAuth applications, requires providing user authentication and scopes.

To simplify the authentication and communication, I opted for the lovely [Spotipy](http://spotipy.readthedocs.io/) library. Simple and intuitive, the library handles the back and forth of authenticating the application with Spotify's Web API and holding on to all the tokens needed for requests to my user account.

## Creating a Class for Modularity

Although this could easily be a single script, I couldn't pass on the opportunity to bundle this code up in some way. I could see this project being extended to handle other playlists, like the Year in Review Playlists.

Maintaining state was a bit cleaner in writing a class as well. Storing the Spotipy instance and several other reusable pieces of state such as the list of tracks kept all the necessary information stored and self contained, ready for use by the class methods.

## Error Handling in Python

My first and primary scripting language is JavaScript. Like many other languages, error and exception handling is not necessarily a beginner topic. So it was surprising to me to be accounting for exceptions so early in my Python coding.

Handle them, I did. Each method is wrapped in a try / except block and logs messages unique to each function, to help keep track of where things will go awry.

## AWS Lambda

The script wouldn't be much of an improvement if I still had to open up a terminal and run it manually! Uploading to AWS as a Lambda function made sense since it's such a lightweight script that is purely interacting with Spotify's web API.

I used the Serverless Framework to streamline the process. Initializing the project with their CLI and customizing the config file, I was able to create a Cron Event Handler to fire off the function every Monday at 7:00 AM.

## Playlists Created on Request

One interesting thing I've noticed about the playlists is that on Mondays when I open up the official Discover Weekly playlist in the desktop App, it will sometimes still show the previous weeks playlist, and then later update with the new tracks for the current week.

I initially thought this would mean that Spotify only updates the playlists _after_ you make a request. If my script ran before that initial access, then it may be saving an old playlist instead of the newly generated one.

However, in practice, it seems it may actually have more to do with Spotify's app cache taking time to update. On logging out results from pinging the endpoint for the current Discover Weekly tracks, both from the first load and from a delayed request, both returned the new tracks appropriately. No need to change my code, but an interesting point to explore

## Try It Out!

If you, too, are an exceptional music nerd, you can give my script a whirl yourself! You can find my code [here at this github repo link](https://github.com/cdpadilla42/spotify-weekly-playlist-saver) with guidelines for setting up AWS Lambda and Serverless.
