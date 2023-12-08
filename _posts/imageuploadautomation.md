---
title: Automating Image Uploads to Cloudinary with Python
tags:
  - Tech
  - Python
date: '2023-12-08T10:35:07.322Z'
---

There's nothing quite like the joy of automating something that you do over and over again.

This week I wrote a python script to make my life easier with image uploads for this blog. The old routine:

- Optimize my images locally (something Cloudinary already automates, but I do by hand for...fun?!)
- Open up the Cloudinary portal
- Navigate to the right directory
- Upload the image
- Copy the url
- Paste the image into my markdown file
- Optionally add optimization tag if needed

I can eliminate most of those steps with a handy script. Here's what I whipped up, with some boilerplate provided by the [Cloudinary SDK quick start guide](https://cloudinary.com/documentation/python_quickstart):

```python
from dotenv import load_dotenv
load_dotenv()

import cloudinary
import cloudinary.uploader
import cloudinary.api
import pyperclip

config = cloudinary.config(secure=True)

print("****1. Set up and configure the SDK:****\nCredentials: ", config.cloud_name, config.api_key, "\n")

print("Image to upload:")
input1 = input()
input1 = input1.replace("'", "").strip()

print("Where is this going? (Art default)")

options = [
	"/chrisdpadilla/blog/art",
	"/chrisdpadilla/blog/images",
	"/chrisdpadilla/albums",
]

folder = options[0]
for i, option in enumerate(options):
	print(f'{i+1} {option}')

selected_number_input = input()


if not selected_number_input:
	selected_number_input = 1

selected_number = int(selected_number_input) - 1
if selected_number <= len(options):
	folder = options[selected_number]


res = cloudinary.uploader.upload(input1, unique_filename = False, overwrite=True, folder=folder)
if res.get('url', ''):
	pyperclip.copy(res['url'])
	
	print('Uploaded! Url Coppied to clipboard:')
	print(res['url'])

```

Now, when I run this script in the command line, I can drag an image in, the script will ask where to save the file, and then automatically copy the url to my clipboard. Magic! ✨

A couple of steps broken down:

### Folders

I keep different folders for organization. Album art is in one. Blog Images in another. Art in yet another. So first, I select which one I'm looking for:

```python
print("Where is this going? (Art default)")

options = [
	"/chrisdpadilla/blog/art",
	"/chrisdpadilla/blog/images",
	"/chrisdpadilla/albums",
]

folder = options[0]
for i, option in enumerate(options):
	print(f'{i+1} {option}')

selected_number_input = input()
```

and later on, that's passed to the cloudinary API as a folder:

```python
if not selected_number_input:
	selected_number_input = 1

selected_number = int(selected_number_input) - 1
if selected_number <= len(options):
	folder = options[selected_number]


res = cloudinary.uploader.upload(input1, unique_filename = False, overwrite=True, folder=folder)
```

### Copying to clipboard

Definitely the handiest, and it's just a quick install to get it. I'm using [pyperclip](https://pypi.org/project/pyperclip/) to make it happen with this one liner:

```python
if res.get('url', ''):
	pyperclip.copy(res['url'])
```