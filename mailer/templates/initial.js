const generateInitialEmail = ({firstName, email}) => `<p>Hi ${firstName},</p>

<p>Thanks for subscribing to my newsletter!</p>
<p>I'll keep you posted with what I'm up to through your subscribed email <strong>${email}</strong></p>
<p>I would love to hear more about you! Something like where you are and what you do.</p>
<p>I'm just a guy on the internet, and meeting people is my favorite part of being online. So thanks in advance for sharing!</p>

<p>You can updated your subscription anytime <a href="https://chrisdpadilla.com/update-sub">chrisdpadilla.com</a>.</p>

<p>Sincerely,</p>
<p>
	Chris Padilla<br />
	<a href="https://chrisdpadilla.com">chrisdpadilla.com</a>
</p>
`

export default generateInitialEmail;