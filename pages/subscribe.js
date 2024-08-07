import React, { useState } from 'react';
import Container from '../components/container';
import Layout from '../components/layout';
import Head from 'next/head';
import Header from '../components/header';
import Link from 'next/link';
import { useRouter } from 'next/router'

export default function Subscribe() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [frequency, setFrequency] = useState('ALL'); 
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

	const onSubmit = async (e) => {
    setSubmitting(true);
    setError(false);
		e.preventDefault();
    const values = {
      firstName,
      lastName,
      email,
      frequency
    }
		const res = await fetch('/api/subscribe', {
      method: 'POST',
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })

    if (res.ok) {
      router.push(`/subscribed?n=${firstName}`);
    } else {
      setError(true);
      setSubmitting(false);
    }
	}
  return (
    <Layout noFooter>
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
          
          <fieldset value={frequency}>
          <legend>How often would you like to receive emails?</legend>
            <input type="radio" id="contactChoice1" name="frequency" value="ALL" checked={frequency === 'ALL'} onChange={e => setFrequency("ALL")}/>
            <label htmlFor="contactChoice1">Sometimes (a few times a year)</label>

            <input type="radio" id="contactChoice2" name="frequency" value="SOME" checked={frequency === 'SOME'} onChange={e => setFrequency("SOME")}/>
            <label htmlFor="contactChoice2">Rarely (once a year)</label>

            <input type="radio" id="contactChoice3" name="frequency" value="UNSUBSCRIBE" checked={frequency === 'UNSUBSCRIBE'} onChange={e => setFrequency("UNSUBSCRIBE")}/>
            <label htmlFor="contactChoice3">None</label>
          </fieldset><br />

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
}
