---
title: Automating YouTube Uploads in Python
tags:
  - Tech
  - This Website
  - Python
date: '2024-01-04T10:35:07.322Z'
---

My command line script for [generating my art posts](/artpostgeneration) is working like a charm! This week, I wanted a workflow for YouTube as well.

The music I share on the socials also end up on this blog. Video hosting is provided by YouTube, which is still a social platform, but it's closer to the [Own Your Content](https://indieweb.org/own_your_data) ethos than just letting it live on Instagram[^1]. 

My current manual procedure:

1. Upload video to YouTube
2. Fill out the form for title, description, etc.
3. Copy the video URL
4. Write out the Blog Post, pasting the copied url in
5. Share to The Grams

While step 5 will be a [fun project for both workflows](https://developers.facebook.com/docs/instagram-api/guides/content-publishing/), today I'm going to focus on truncating steps 1-4.

## Youtube Setup

For the most part, this has already been solved. Much of the Boiler plate code will come from [YouTube's Data API docs](https://developers.google.com/youtube/v3/guides/uploading_a_video). I'll document the tweaks unique to my situation..

## Class Encapsulation

I'm going to want to reuse the args that we'll receive. So instead of a single script, I'll wrap this in a class:

```
class YoutubeUploader:
	def __init__(self, args):
		self.args = args
		self.prompt_for_video_details(args)
	
	. . . 
	
if __name__ == '__main__':

	# Get args
	YTU = YoutubeUploader(args)	
```

## Getting Arguments

The provided script uses argparser to get video details when running our command:

```python
if __name__ == '__main__':
	argparser.add_argument("--file", help="Video file to upload")
	argparser.add_argument("--title", help="Video title", default="")
	argparser.add_argument("--description", help="Video description",
		default="")
	argparser.add_argument("--category", default="22",
		help="Numeric video category. " +
			"See https://developers.google.com/youtube/v3/docs/videoCategories/list")
	argparser.add_argument("--keywords", help="Video keywords, comma separated",
		default="")
	argparser.add_argument("--privacyStatus", choices=VALID_PRIVACY_STATUSES,
		default=VALID_PRIVACY_STATUSES[0], help="Video privacy status.")
	args = argparser.parse_args()
	
```
*index.py*

Personally, I find this cumbersome to write out, so I'm going to opt for command line prompts. I'll add a `prompt_for_video_details()` method to the class:

```python
def prompt_for_video_details(self, args):
	if not self.args.file:
		file = input("File: ")
		file = file.replace("'", "").strip()
		setattr(self.args, 'file', file)
	if not self.args.title:
		title = input("Title (Gurlitt – The Return): ")
		setattr(self.args, 'title', title)
	if not self.args.description:
		description = input("Description: ")
		setattr(self.args, 'description', description)
	if not os.path.exists(self.args.file):
		exit("Please specify a valid file using the --file= parameter.")
	
	self.slug = input("slug(default to title): ")
```

`setattr()` is being here as a workaround. The `args` dictionary provided by argparser does not allow direct attribution setting with the usual `args['key']` approach. I can see the reasoning to keep it immutable, but for my case, I'm ok with mutating it since I likely won't be using the flags in most cases.

## Getting the YouTube ID

Within the `resumable_upload` provided, I'll be getting the video id returned in the response. Here, I'll also respond with the remaining automation.

```python
if response is not None:
	if 'id' in response:
		video_id = response['id']
		print(("Video id '%s' was successfully uploaded." % response['id']))
		self.generate_blog_post(video_id=video_id)
		self.open_video(response['id'])
	else:
		exit("The upload failed with an unexpected response: %s" % response)
```

## Completing the Form

Unfortunately, the API doesn't expose all of the required fields in the form. So while the video will upload, I have to complete another step by opening up the page. Here, I'm simply sticking in the video ID returned from the upload and using `webbrowser` to open those tabs:

```
def open_video(self, id):
	print("Opening YouTube Studio!")
	print("Switch YT accounts if needed?")
	webbrowser.open_new_tab(f"https://studio.youtube.com/video/{id}/edit")
	webbrowser.open_new_tab(f"https://www.youtube.com/")

```

## Generating Markdown

This will look very familiar [compared to last week](/artpostgeneration)! I'm essentially reusing the same logic here:

```python
def generate_blog_post(self, video_id: str = '') -> bool:
	today = datetime.datetime.now()

	weekday = today.weekday()
	days_from_target = datetime.timedelta(days=MUSIC_TARGET_WEEKDAY - weekday)
	target_date = today + days_from_target
	target_date_string = target_date.strftime('%Y-%m-%d')

	date_ok = input(f"{target_date_string} date ok? (Y/n): ")
	if "n" in date_ok:
		print("Set date:")
		target_date_string = input()
		print(f"New date: {target_date_string}")
		input("Press enter to continue ")

	md_body = MUSIC_POST_TEMPLATE.format(self.args.title, target_date_string, video_id, video_id, self.args.description)
	with open(BLOG_POST_DIR + f"/{self.slug}.md", "w") as f:
		f.write(md_body)
```

And that's it! Many future keystrokes and button clicks saved!


[^1]: Actually, looking up the [Indie Web Wiki](https://indieweb.org/own_your_data), I'm taking some comfort in this definition: "You own your own domain but use Tumblr.com or WordPress.com or some other hosted content solution to publish content (like posts) on your site. You own your permalinks so you can change hosting and (with some work) keep your permalinks working." With some work, _indeed_. Sounds like an interesting future project.