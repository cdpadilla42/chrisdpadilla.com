---
title: Generating Posts Programmatically with Python
tags:
  - Tech
date: '2023-12-20T10:35:07.322Z'
---

I'm extending my quick script from a previous post on [Automating Image Uploads to Cloudinary with Python](/imageuploadautomation). I figured — why stop there! Instead of just automating the upload flow and getting the url copied to my clipboard, I could have it generate the whole markdown file for me!

Form there, the steps that will be automated:

- Verifying it's an art post (based on which folder I select to save the image to)
- Creating a file with the post date in the filename (I usually put them together on Fridays, and share on Saturday)
- Writing details from the command line, such as title, alt text, and post body.

Here we go!

## Reorganizing

First order of business is organizing the code. This was previously just a script, but now I'd like to encapsulate everything within a class. 

In my index.py, I'll setup the class:

```
from dotenv import load_dotenv
load_dotenv()

import datetime
import cloudinary
import cloudinary.uploader
import cloudinary.api
import pyperclip

class ImageHandler():
	"""
	Upload Images to cloudinary. Generate Blog page if applicable
	"""
	def __init__(self, test: bool = False):
		self.test = test

		config = cloudinary.config(secure=True)
		print("****1. Set up and configure the SDK:****\nCredentials: ", config.cloud_name, config.api_key, "\n")
		

```

Beneath, I'll wrap the [previous code](/imageuploadautomation) in a method called "upload_image()"

I'll still call the file directly to run the main script, so at the bottom of the file I'll add the code to do so:

```
if __name__ == '__main__':
	ImageHandler().run()
```

So, on run, I want to handle the upload to Cloudinary. From the result, I want to get the image url back, and I want to know if I should start generating an art post:

```
def run(self):
	image_url, is_art_image = self.upload_image()
	print(is_art_image)
	if is_art_image:
		self.generate_blog_post(image_url=image_url)

```

To make that happen, I'm adding a bit of logic to `image_upload` to check if I'm storing the image in my art folder:

```
def upload_image(self):

	... 
	
	options = [
		"/chrisdpadilla/blog/art",
		"/chrisdpadilla/blog/images",
		"/chrisdpadilla/albums",
	]

	is_art_image = selected_number == 0
	
	...
	
	selected_number = int(selected_number_input) - 1
	is_art_image = selected_number == 0
		
	...
	
	return (res_url, is_art_image)
```

That tuple will then return string and boolean in a neat little package.

Now for the meat of it! I'll write out my `generate_blog_post()` method.

Starting with date getting. Using datetime and timedelta, I'll be checking to see when the next Saturday will be (ART_TARGET_WEEKDAY is a constant set to 6 for Saturday):

```
def generate_blog_post(self, image_url: str = '') -> bool:
	today = datetime.datetime.now()

	weekday = today.weekday()
	days_from_target = datetime.timedelta(days=ART_TARGET_WEEKDAY - weekday)
	target_date = today + days_from_target
	target_date_string = target_date.strftime('%Y-%m-%d')

```

Sometimes, I do this a week out, so I'll add some back and forth incase I want to manually set the date:

```
	date_ok = input(f"{target_date_string} date ok? (Y/n): ")
	if "n" in date_ok:
		print("Set date:")
		target_date_string = input()
		print(f"New date: {target_date_string}")
		input("Press enter to continue ")
		
```
From here, it's all command line inputs. 

```
	
	title = input("Title: ")
	alt_text = input("Alt text: ")
	caption = input("Caption: ")
	
```

And then I'll use a [with statement](https://peps.python.org/pep-0343/) to do my file writing. The benefit of using the `with` keyword here is that it will handle file closing automatically.

```

	md_body = SKETCHES_POST_TEMPLATE.format(title, target_date_string, alt_text, image_url, caption)
	with open(BLOG_POST_DIR + f"/sketches-{target_date_string}.md", "w") as f:
		f.write(md_body)

	return True
```

Violà! Running through the command line now generates a little post! Lots of clicking and copy-and-pasting time saved! 🙌