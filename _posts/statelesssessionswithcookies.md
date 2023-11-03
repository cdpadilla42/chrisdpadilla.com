---
title: Stateless Sessions With Cookies
tags:
  - Tech
date: '2023-11-03T10:35:07.322Z'
---

I'm diving into a large research project around authentication, so get ready for many a blog about it!

This week, an approach to handling email/password login.

## Authentication

Authentication is simply verifying someone's identity. Different from authorization, which deals with roles and permissions, or if a user can perform certain actions within your application. Authentication is logging someone in, where authorization is verifying they have access to, say, an admin page or editing functionality.

Email and password is the most ubiquitous approach for authentication. And implementing it only takes a few components.

## Storage and Encryption

For a custom solution, email and password combinations can be stored on the DB along with a user's profile. When doing this, password encryption is a vital ingredient in the event of a data leak.

[bcrypt](https://github.com/kelektiv/node.bcrypt.js) is a tried and tested solution here. From their documentation, hashing and checking the password are simple function calls:

```
// encrypt
bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
        // Store hash in your password DB.
    });
});

// Load hash from your password DB.
bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
    // result == true
});

```

`saltRounds`, if that stands out to you, is the number of iterations of random strings included in the hashing process.

## Http and Encryption

All fine and well once the password gets here, but what about when it's being sent to the server? HTTP is simply a plain text protocol. Were it to be intercepted by a malicious party, the email and password combo can be used maliciously.

From the client, we can encrypt with the SHA-256 algorithm, and then decode it on the server.

Here's a client example from [MDN](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest):

```
const text =
  "An obscure body in the S-K System, your majesty. The inhabitants refer to it as the planet Earth.";

async function digestMessage(message) {
  const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8); // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(""); // convert bytes to hex string
  return hashHex;
}

digestMessage(text).then((digestHex) => console.log(digestHex));

```

And then on a Node Server, the built in [Crypto library can decrypt](https://nodejs.org/dist/latest-v11.x/docs/api/crypto.html#crypto_class_decipher) the password.

## Sustaining Session

Great! A user is signed in on the homepage. But, once they navigate to another, how do we maintain that logged in state?

I've actually written on two different approaches before: [JWT's and Session Storage](/authentication). Here I'll talk a bit about server sessions and then focus on a twist on the JWT pattern:

A classic approach is to maintain session data on the server. Once a user is authenticated, a cookie is then sent to be stored on the client browser. That cookie comes along for the ride on every request back to the server with no extra overhead (unlike, say, local storage, which would require writing some logic.) With an authentication token stored on the cookie, the server can verify the token and then confirm that it's from the logged in user.

A nice approach for many reasons! If needed, an admin can manually log the user out if there's suspicious activity with an account. Cookies are also a lightweight and easy to implement technology built into the browser.

One drawback is that the session is tied to the specific server. There's added complexity here in a micro service environment. Maintaining that state may also slow the server down with the added overhead.

Another take on this approach is how Ruby on Rails and the package [iron-session](https://github.com/vvo/iron-session) still makes use of cookies, but with a "stateless" session from the server.

[From the Ruby on Rails guide](https://guides.rubyonrails.org/security.html#session-storage), the idea is that session IDs are replaced with a session hash that can only be decrypted and validated by your server. In this case, it's the client keeping track of their own session, while the server is simply responsible for approving the token. Decrypted, the cookie may contain basic client info:

`{user: {id: 100}}`

(A note to still avoid PII (personally identifiable information) or storing passwords here!)

This is similar to using JWT's as authentication tokens. A benefit to using a package like iron session here, though, is that the session cookie comes with encrypted data from a non-spec'd algorithm. JWT, however, is a standard. Unless you encrypt it yourself, it's easy for anyone to decrypt your JWT.
