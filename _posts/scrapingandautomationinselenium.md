---
title: Automation & Web Scraping with Selenium
tags:
  - Python
date: '2024-02-16T10:35:07.322Z'
---

I had a very [Automate The Boring Stuff](https://automatetheboringstuff.com/) itch that needed scratching this week! 

I have an office in town that I go to regularly. I'm on a plan for X number of visits throughout the year. The portal tells me how many visits I have left, but there's a catch. My plan also includes a special one-on-one consult doesn't let me know when I can redeem two special one-on-one consults as part of the package, ideally scheduled evenly through the year. 

I *could* just put in the calendar to do this on reasonable months – April and September. But what if I kick up my visit frequency? What if I'm the business owner and I want to track this for multiple clients? What if I just want to play around with Selenium for an evening?

So here's how I automated cacluating this through the business's portal!

## Selenium

If you've scraped the web or done automated tests, then you're likely familiar with Selenium. It's a package that handles puppeteering the browser of your choice through web pages as though a user were interacting with them. Great for testing and crawling!

If I were just crawling public pages, I could reach for Beautiful Soup and call it a day. However, the info I need is behind a login page. Selenium will allow me to sign in, navigate to the correct pages, and then grab the data.

## Setup

Setting up the script, I'll do all of my importing and class initialization:

```
import os
import re
from dotenv import load_dotenv
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.common import exceptions
from selenium.webdriver.support import expected_conditions
from datetime import datetime

class Collector:
	def __init__(self):
		load_dotenv()
		options = webdriver.ChromeOptions()
		options.add_experimental_option("detach", True)
		self.driver = webdriver.Chrome(options=options)
		self.login_url = "https://biz.office.com/login"
		self.account_url = "https://biz.office.com/account"
		
	def run(self):
		self.handle_login()
		visit_history = self.get_visit_history()
		self.get_remaining_visits_until_package_renewal(visit_history)
		

if __name__ == '__main__':
	c = Collector().run()
```

I'm storing my login credentials in an `.env` file, as one should! The "detatch" option passed in simply keeps the window open after the script runs so I can investigate the page afterwards if needed. The URLs are fictitious here.

So, all set up! Here's looking at each function one at a time:

## Login

```
def handle_login(self):
	AUTH_FIELD_SELECTOR =	"input#auth_key"
	LOGIN_BUTTON_SELECTOR =	"button#log_in"
	PASSWORD_FIELD_SELECTOR =	"input#password"

	self.driver.get(self.login_url)

	self.wait_for_element(AUTH_FIELD_SELECTOR, 10)

	text_box = self.driver.find_element(By.CSS_SELECTOR, AUTH_FIELD_SELECTOR)
	login_button_elm = self.driver.find_element(By.CSS_SELECTOR, LOGIN_BUTTON_SELECTOR)
	text_box.send_keys(os.getenv('EMAIL'))
	login_button_elm.click()

	# Password Page

	self.checkout_page(PASSWORD_FIELD_SELECTOR, 10)

	self.driver.find_element(By.CSS_SELECTOR, PASSWORD_FIELD_SELECTOR).send_keys(os.getenv("PW"))
	self.driver.find_element(By.CSS_SELECTOR, LOGIN_BUTTON_SELECTOR).click()
```

Writing with Selenium is nice because of how sequential and fluid writing the code is. The code above lays out quite literally what's happening on the page. Once I've received the page and verified it's opened, we're just grabbing the elements we need with CSS selectors and using interactive methods like `send_keys()` to type and `click()` to interact with buttons.

Something worth pointing out is `wait_for_element`. It's mostly a wrapper for this Selenium code:

```
WebDriverWait(self.driver, 30).until(
	expected_conditions.presence_of_element_located((By.CSS_SELECTOR, element_selector))
)
```

This is a point to ask Selenium to pause until a certain element appears on the screen. Cumbersome to write every time, so nice to have it encapsulated!

## Get Visit History

Once logged in, it's time to navigate to the page with my visit history. The page contains a table with columns for visit date, session name, and the member name (me!) So what I'm doing below is:

1. Navigating to the correct page by button click (it's a SPA, so a necessary step instead of by URL directly.)
2. Grabbing the column index for row values in the table header
3. Iterating through the rows and extracting the data

```
def get_visit_history(self):
	visits = []
	ACCOUNT_HISTORY_PAGE_BUTTON_SELECTOR = 'a[href="#history"]'

	headers_index = {}
	
	self.driver.find_element(By.CSS_SELECTOR, ACCOUNT_HISTORY_PAGE_BUTTON_SELECTOR).click()


	self.checkout_page(ACCOUNT_HISTORY_PAGE_BUTTON_SELECTOR, 10)

	headers = self.driver.find_elements(By.CSS_SELECTOR, '#history tbody > tr > th')
	for h, header in enumerate(headers):
		header_text = header.get_attribute('innerText')

		if re.search(r'date', header_text, re.IGNORECASE):
			headers_index['date'] = h
		elif re.search(r'session', header_text, re.IGNORECASE):
			headers_index['session'] = h
		elif re.search(r'member', header_text, re.IGNORECASE):
			headers_index['member'] = h

	rows = self.driver.find_elements(By.CSS_SELECTOR, '#history tbody tr')
	for row in rows:
		row_dict = {}
		cells = row.find_elements(By.CSS_SELECTOR, 'td')
		if not len(cells):
			continue

		if 'date' in headers_index:
			row_dict['date'] = cells[headers_index['date']].get_attribute('innerText')
		if 'session' in headers_index:
			row_dict['session'] = cells[headers_index['session']].get_attribute('innerText')
		if 'member' in headers_index:
			row_dict['member'] = cells[headers_index['member']].get_attribute('innerText')
		
		visits.append(row_dict)

	return visits

```

## Calculate Remaining Visits

From here, it's just math and looping! 

Plan length and start date are hardcoded below, but could be pulled from the portal similar to the method above. 

With that, I'm counting down remaining visits if an entry in the visits table is for a date beyond the start date and if it's a "plan visit". Once we've passed the date threshold, we can break the loop.

For the math – I calculate session values by dividing the full plan length, and reducing those values from the remaining visits. If there's a positive difference, then it's logged as X number of days until the consult.

```
def get_remaining_visits_until_package_renewal(self, visit_history):
	PLAN_LENGTH = 37
	START_DATE = datetime(2024, 1, 1).date()

	remaining = PLAN_LENGTH

	for visit in visit_history:
		stripped_date = visit['date'].split('-')[0].strip()
		if not re.search('plan visit', visit['session'], re.IGNORECASE):
			continue
		elif datetime.strptime(stripped_date, '%B %d, %Y').date() >= START_DATE:
			remaining -= 1
		else:
			break
	
	interval = math.floor(PLAN_LENGTH / 3)
	first_session = interval * 2
	second_session = interval

	visits_until_first_session = remaining - first_session
	visits_until_second_session = remaining - second_session

	if visits_until_first_session > 0:
		print(f'{visits_until_first_session} visits until first consult')
	elif visits_until_second_session > 0:
		print(f'{visits_until_second_session} visits until second consult')
	else:
		print(f"All consults passed! {remaining} remaining visits")

	return remaining

```

## Done!

So there you have it! Automation, scraping, and then using the data! A short script that covers a lot of ground. 

A fun extension of this would be to throw this up on AWS Lambda, run as a cron job once a week, and then send an email notifying me when I have one or two visits left before I should schedule the consult. 

Will our lone dev take the script to the cloud?! Tune in next week to find out! 📺