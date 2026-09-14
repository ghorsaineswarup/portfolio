import nodemailer from 'nodemailer';

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    family: 4, // force IPv4 — some hosts (like Render) can't route to Gmail's IPv6 address
  });
  return transporter;
}

export async function sendContactEmail({ name, email, message }) {
  const t = getTransporter();
  if (!t) {
    console.log('Email skipped: SMTP env vars not set.');
    return;
  }

  const to = process.env.CONTACT_TO_EMAIL || process.env.SMTP_USER;
  console.log(`Attempting to send contact email to ${to}...`);
  const info = await t.sendMail({
    from: process.env.SMTP_USER,
    to,
    replyTo: email,
    subject: `New contact form message from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  });
  console.log('Email sent successfully:', info.messageId);
}