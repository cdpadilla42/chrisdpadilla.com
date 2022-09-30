---
title: HTML Form Validation is Pretty Good!
tags:
  - Tech
date: '2022-10-03T05:35:07.322Z'
---

After spending a fair chunk of time working in forms the React way, I've gotta say — we already get a lot of goodies with the basic HTML inputs.

There's a project I worked on recently that had me working in Vanilla JavaScript. No React, no libraries, just raw HTML, JS, and CSS.

I went in mentally preparing to have to write my own library. I was prepped to recreate [Formik](https://formik.org/) for this project. But I didn't really have to!

Here are some of the niceties that saved me a ton of time:

# Input Pattern Attribute

Without needing to write any JS, you can check to ensure a text input matches a regex pattern. Here's an example from [w3schools](https://www.w3schools.com/tags/att_input_pattern.asp):

```
<form action="/action_page.php">
  <label for="country_code">Country code:</label>
  <input type="text" id="country_code" name="country_code"
  pattern="[A-Za-z]{3}" title="Three letter country code"><br><br>
  <input type="submit">
</form>

```

The `title` attribute is the message that shows when there is a discrepancy between the input value and your `pattern` regex.

# Constrain Validation API

That may not cover _all_ use cases, but modern browsers come with an API for further validation customization.

[The Constrain Validation API](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation#validating_forms_using_javascript) is available on most form inputs. There are a couple of methods that are useful here: `setCustomValidity()` and `reportValidity()`

`setCustomValidity` allows us to set a custom error message. `reportValidity` will then show the message when we call it on an element.

When we get to handling form submission, these give us a way of still working with the browser's built in UI and form API.

```
const handleSubmit = (e) => {
	// We use our custom name validation here
	const nameElm = document.querySelector('#contact-name');
	const isNameValid = validateName(nameElm.value);

	// And integrate with the API here
	if (isNameValid) {
		// If valid, we set the message to an empty string, meaning it passes.
		nameElm.setCustomValidity('');
	} else {
		// If invalid, setting an error message will mark the input as invalid.
		// Report Validity then shows the message.
		nameElm.setCustomValidity('Please enter a valid phone number');
		nameElm.reportValidity();
	}
}

```

Bonus: The CSS psuedo-classes are available when working with the form in this way. We can still make of use CSS such as this:

```
input:invalid {
  box-shadow: 0 0 5px 1px red;
}

input:focus:invalid {
  box-shadow: none;
}

```

More details and examples are available on the [MDN article for HTML form validation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation#validating_forms_using_javascript).
