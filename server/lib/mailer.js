import { Resend } from 'resend';

let resendClient = null;

function getClient() {
  if (resendClient) return resendClient;
  if (!process.env.RESEND_API_KEY) return null;
  resendClient = new Resend(process.env.RESEND_API_KEY);
  return resendClient;
}

export async function sendContactEmail({ name, email, message }) {
  const client = getClient();
  if (!client) {
    console.log('Email skipped: RESEND_API_KEY not set.');
    return;
  }

  const to = process.env.CONTACT_TO_EMAIL;
  console.log(`Attempting to send contact email to ${to}...`);

  const { data, error } = await client.emails.send({
    from: 'Portfolio Contact Form <onboarding@resend.dev>',
    to,
    replyTo: email,
    subject: `New contact form message from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  });

  if (error) {
    console.error('Failed to send contact email notification:', error.message || error);
    return;
  }
  console.log('Email sent successfully:', data.id);
}