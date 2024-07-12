---
title: Sending Email From a Next.JS App
tags:
  - Tech
  - JavaScript
  - React
  - Next
  - Node
  - This Website
date: '2024-07-12T10:35:07.322Z'
---

My favorite spot to catch up with writers and artists is from the comfort of my own email inbox. Social media algorithms are fickle and too bite-sized to be sustaining. But sitting down for a couple of minutes to read an email long form is a delight!

I was curious about implementing the infrastructure for this very site. I don't plan on going full-on email marketer! I am interested, though, in a once or twice a year short note on what's going on in my corner of the internet. 

And, the fun part — It means getting to write some node code to set up an email subscription flow!

## API

My implementation started as a fork of Pete Houston's [Simple Newsletter repo](https://github.com/petehouston/simple-newsletter) on GitHub. If you want to get started quickly with a project like this, I'd highly recommend taking a look there!

I'll breeze through, doing a few steps "off-camera first":

1. Setting Up a MongoDB database to store subscriptions
2. Writing my Schema for the above.
3. Importing Pete's [mailer.js](https://github.com/petehouston/simple-newsletter/blob/master/mailer/index.js) file for formatting and sending email templates
4. Integrating the API endpoint in my Next.js app under `/pages/api/subscribe.js`

This setup is fairly similar to my [DIY Analytics](/diyanalytics) put in place for a separate React project.

Writing `/pages/api/subscribe.js` will expose my endpoint at `chrisdpadilla.com/api/subscribe`. A `POST` request there will submit data to save the user subscription and send a welcome email.

## Client Flow

Writing the client flow is just good-ol' React. I'll be using state, submitting a form, and handling the results.

On my `subscribe.js` page, I'll start by setting up state for form fields:

```JavaScript
export default function Subscribe() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [frequency, setFrequency] = useState('ALL'); 
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  
  ...
  
}
```

I'm also bringing in the `useRouter` hook to later forward the user to a success page on completion.

Next, we'll render the form:

```JavaScript
return (
    <Layout>
      <Head>
        <title>Newsletter | Chris Padilla</title>
      </Head>
      <Header />
      <Container>
        <h1>Email Newsletter</h1>
        <p>A quiet set of updates — just a couple a year — on what I'm up to. Unsubscribe anytime.</p>
        <p>Looing to update your subscription? <Link href={`/update-sub`}>Click here</Link>.</p>
				<form onSubmit={onSubmit}>
          <label htmlFor="firstName">First name:</label><br />
          <input type="text" id="firstName" name="firstName" required value={firstName} onChange={e => setFirstName(e.currentTarget.value)} /><br />
          <label htmlFor="lastName">Last name:</label><br />
          <input type="text" id="lastName" name="lastName" required value={lastName} onChange={e => setLastName(e.currentTarget.value)} /><br />
          <label htmlFor="email">Email:</label><br />
          <input type="email" id="email" name="email" required value={email} onChange={e => setEmail(e.currentTarget.value)} /><br />
  
          <button type="submit" disabled={submitting}>{submitting ? 'Submitting...' : 'Sign Me Up!'}</button>
          {error && (
            <p>Oops! Something went wrong... try refreshing. If all else fails,  <Link href={`/contact`}>
            <a>reach out to me directly.</a>
          </Link>.</p>
          )}
				</form>
      </Container>
    </Layout>
  );
```

Next I'll handle radio elements for emailing frequency. Most input fields are simple enough with one element. Radio elements, however, require special logic to work. Here, I'm setting the value to true only if our state matches the current element. The `onChange` is then responsible for updating the state to its value.


```HTML
<fieldset value={frequency}>
  <legend>How often would you like to receive emails?</legend>
    <input type="radio" id="contactChoice1" name="frequency" value="ALL" checked={frequency === 'ALL'} onChange={e => setFrequency("ALL")}/>
    <label htmlFor="contactChoice1">Sometimes (a few times a year)</label>

    <input type="radio" id="contactChoice2" name="frequency" value="SOME" checked={frequency === 'SOME'} onChange={e => setFrequency("SOME")}/>
    <label htmlFor="contactChoice2">Rarely (once a year)</label>

    <input type="radio" id="contactChoice3" name="frequency" value="UNSUBSCRIBE" checked={frequency === 'UNSUBSCRIBE'} onChange={e => setFrequency("UNSUBSCRIBE")}/>
    <label htmlFor="contactChoice3">None</label>
  </fieldset><br />

```

Now for submitting the form! My submit handler will set the submitting state so the input button won't accidentally be double-clicked. 

Then, I'll gather the values from state. From there, the `fetch` API is used to send the request. And upon successful submission, the user is then redirected to `/subscribed?n={firstName}`. The query param is added to customize the message when they land. 

That's all there is to it! There's more work involved with handling updating subscription status and using the templates. If your curious, I'd recommend digging into Pete Houston's [Simple Newsletter repo](https://github.com/petehouston/simple-newsletter) and playing with it yourself!

Oh, _by the way!_ You can see the [working page here](/subscribe)!