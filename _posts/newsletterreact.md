---
title: Creating a Newsletter Form in React
tags:
  - Tech
  - React
date: '2022-11-17T05:35:07.322Z'
---

Twitter is in a spot, so it's time to turn to good ol' RSS feeds and email for keeping up with your favorite artists, developers, and friends!

We built one [for our game](https://acnewmurder.com/). This is another case in which building forms are more interesting than you'd expect.

# Component Set Up

To get things started, I've already built an API similar to the one outlined [here in my Analytics and CORS post](/diyanalytics)

There are ultimately three states for this simple form: Pre-submitting, success, and failure.

Here's the state that accounts for all of that:

```
// Newsletter.js

import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { signUpForNewsletter } from '../lib/util';

const defaultMessage = 'Enter your email address:';
const successMessage = 'Email submitted! Thank you for signing up!';

const Newsletter = () => {
  const [emailValue, setEmailValue] = useState('');
  const [message, setMessage] = useState(defaultMessage);
  const [emailSuccess, setEmailSuccess] = useState(false);

  . . .
};
```

We're holding the form value in our `emailValue` state. `message` is what is displayed above our input to either prompt them to fill the form, or inform them they succeeded. `emailSuccess` is simply state that will adjust styling for our success message later.

# Rendering Our Component

Here's is that state in action in our render method:

```
// Newsletter.js

  return (
    <StyledNewsletter onSubmit={handleSubmit}>
      <label
        htmlFor="email"
        style={{ color: emailSuccess ? 'green' : 'inherit' }}
      >
        {message}
      </label>
      <input
        type="email"
        name="email"
        id="email"
        value={emailValue}
        onChange={(e) => setEmailValue(e.currentTarget.value)}
      />
      <button type="submit">Sign Up</button>
    </StyledNewsletter>
  );

```

Setting our input to email will give us some nice validation out of the box. I'm going against the current common practice by using inline styles here for simplicity.

# Handling Submit

Let's take a look at what happens on submit:

```
// Newsletter.js

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (emailValue && isValidEmail(emailValue)) {
      const newsletterRes = await signUpForNewsletter(emailValue);
      if (newsletterRes) {
        setEmailValue('');
        setEmailSuccess(true);
        setMessage(successMessage);
      } else {
        window.alert('Oops! Something went wrong!');
      }
    } else {
      window.alert('Please provide a valid email');
    }
  };

```

The html form, even when we prevent the default submit action, actually still checks the email input against it's built in validation method. A great plus! I have a _very_ simple `isValidEmail` method in place just to double check.

Once we've verified everything looks with our inputs, on we go to sending our fetch request.

```
// util.js

export const signUpForNewsletter = (email) => {
  const data = { email };

  if (!email) console.error('No email provided', email);

  return fetch('https://coolsite.app/api/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
      return true;
    })
    .catch((error) => {
      console.error('Error:', error);
      return false;
    });
};

```

I'm including return statements and a handler based on those return statements later with `if (newsletterRes) ...` in our component. If it's unsuccessful, returning false will go into our very simple `window.alert` error message. Else, we continue on to updating the state to render a success message!

# Wrap Up

That covers all three states! Inputing, error, and success. This, in my mind, is the bare bones of getting an email form setup! Yet, there's already a lot of interesting wiring that goes into it.

From a design standpoint, a lot of next steps can be taken to build on top of this. From here, you can take a look at the API and handle an automated confirmation message, you can include an unsubscribe flow, and you can include a "name" field to personalize the email.

Even on the front end, a much more robust styling for the form can be put in place.

Maybe more follow up in the future. But for now, a nice sketch to get things started!

Here's the full component in action:

```
// Newsletter.js

import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { signUpForNewsletter } from '../lib/util';

const defaultMessage = 'Enter your email address:';
const successMessage = 'Email submitted! Thank you for signing up!';

const Newsletter = () => {
  const [emailValue, setEmailValue] = useState('');
  const [message, setMessage] = useState(defaultMessage);
  const [emailSuccess, setEmailSuccess] = useState(false);

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (emailValue && isValidEmail(emailValue)) {
      const newsletterRes = await signUpForNewsletter(emailValue);
      if (newsletterRes) {
        setEmailValue('');
        setEmailSuccess(true);
        setMessage(successMessage);
      } else {
        window.alert('Oops! Something went wrong!');
      }
    } else {
      window.alert('Please provide a valid email');
    }
  };

  return (
    <StyledNewsletter onSubmit={handleSubmit}>
      <label
        htmlFor="email"
        style={{ color: emailSuccess ? 'green' : 'inherit' }}
      >
        {message}
      </label>
      <input
        type="email"
        name="email"
        id="email"
        value={emailValue}
        onChange={(e) => setEmailValue(e.currentTarget.value)}
      />
      <button type="submit">Sign Up</button>
    </StyledNewsletter>
  );
};

export default Newsletter;

const StyledNewsletter = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  font-family: inherit;
  font-size: inherit;
  padding: 1rem;
  text-align: center;
  align-items: center;
  margin: 0 auto;

  label {
    margin: 1rem 0;
  }

  #email {
    width: 80%;
    padding: 0.5rem;
    /* border: 1px solid #75ddc6;
    outline: 3px solid #75ddc6; */
    font-family: inherit;
    font-size: inherit;
  }

  button[type='submit'] {
    position: relative;
    border-radius: 15px;
    height: 60px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    padding: 2rem;
    font-weight: bold;
    font-size: 1.3em;
    margin-top: 1rem;
    background-color: var(--cream);
    color: var(--brown-black);
    border: 3px solid var(--brown-black);
    transition: transform 0.2s ease;
    text-transform: uppercase;
  }

  button:hover {
    color: #34b3a5;
    background-color: var(--cream);
    border: 3px solid #34b3a5;
    cursor: pointer;
  }
`;

```
