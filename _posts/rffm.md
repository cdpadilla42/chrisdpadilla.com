---
title: Customizing Field State in React Final Form
tags:
  - Tech
  - React
date: '2022-09-27T05:35:07.322Z'
---

React Final Form is a delightful library. So much comes out of the box, and it's extensible enough to handle custom solutions.

I've been working with it a fair amount recently. Here's what adding custom logic looks like:

# Scenario

Say that you have data that needs to update two fields within your form. An example might be that you have an event form with the fields:

- Name: Skate-a-thon 2022
- Start Date: August 3rd
- End Date: August 5th

Let's also say that Skate-a-thon got rescheduled to another weekend.

When going in to push back the start date, we want our form logic to automatically update the end date as well - to also go back 7 days.

# Simple Set up In Final Form

I'll leave the initial set up to the [React Final Form docs](https://final-form.org/docs/react-final-form/getting-started).

Let's pick up with a component that looks like this within our form:

```
<h2>Render Function as Children</h2>
<Field name="name">
  {({ input, meta }) => (
    <div>
      <label>Name</label>
      <input type="text" {...input} placeholder="Name" />
      {meta.touched && meta.error && <span>{meta.error}</span>}
    </div>
  )}
</Field>

<Field name="startDate">
  {({ input, meta }) => (
    <div>
      <label>Start Date</label>
      <input type="date" {...input} placeholder="Start Date" />
      {meta.touched && meta.error && <span>{meta.error}</span>}
    </div>
  )}
</Field>

<Field name="endDate">
  {({ input, meta }) => (
    <div>
      <label>End Date</label>
      <input type="date" {...input} placeholder="End Date" />
      {meta.touched && meta.error && <span>{meta.error}</span>}
    </div>
  )}
</Field>
```

We're assuming we already have our `<Form>` wrapper and submit button elsewhere.

So far with this code, all of our fields will update independently.

To tie together our `endDate` field with the `startDate`, we'll need a custom `onChange` method and a way to access the form API ourselves.

# Form Hook

Two hooks come in handy here:

- `userForm()`: Gives us all access to utility methods for our form. It can be called in any component within the `<Form>` wrapper.
- `useFormState()`: As the name implies, gives us access to the current state, including values and meta data such as what fields have been "touched"

We'll open up our component with these hooks:

```
import React from 'react';
import {Field, useForm, useFormState} from 'react-final-form';

const FormComponent = () => {
  const formApi = useForm();
  const {values} = useFormState();

  return(
    ...
  )
};

```

And then use these in a custom `onChange` handler on our field

```
<Field name="startDate">
  {({ input, meta }) => (
    <div>
      <label>Start Date</label>
      <input
        type="date"
        {...input}
        placeholder="Start Date"
        // Custom onChange below
        onChange={(e) => {
          const newStartDate = e.currentTarget.valueAsDate;

          // Lets assume I've written a COOL function that takes in the
          // Initial values for startDate and endDate, and calculates a
          // new endDate based on that
          const newValue = calculateNewDateBasedOnNewStartDate(newStartDate, values);

          // Update both values through the formApi
          formApi.change('startDate', newStartDate)
          formApi.change('endDate', newValue)
        }}
      />
      {meta.touched && meta.error && <span>{meta.error}</span>}
    </div>
  )}
</Field>
```

There you go! The `endDate ` will update alongside the start date from here!
