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
  });
  return transporter;
}

// No-ops silently if SMTP_* env vars aren't set. The message is still
// saved to the database regardless — this is just a "nice to be notified" extra.
export async function sendContactEmail({ name, email, message }) {
  const t = getTransporter();
  if (!t) return;

  const to = process.env.CONTACT_TO_EMAIL || process.env.SMTP_USER;
  await t.sendMail({
    from: process.env.SMTP_USER,
    to,
    replyTo: email,
    subject: `New contact form message from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  });
}