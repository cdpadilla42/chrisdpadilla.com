const generateBlogEmail = ({firstName, url, title}) => `<p>Hi ${firstName},</p>

<p>I have a new post on my site! You can find "${title}" on my site <a href="${url}">here</a></p>

${generateEMAILFooter()}
`;

const generateEMAILFooter = () => `
<p><strong>Thank you for takign a look!</strong> I'd love to hear your thoughts. Feel free to reply to this email!</p>
<p>Sincerely,</p>
<p>Chris Padilla<br />PS: You can also change your email preferences and unsubscribe by replying.</p>
`;

export default generateBlogEmail