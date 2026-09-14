import nodemailer from 'nodemailer';
import dns from 'node:dns';

let transporter = null;

async function resolveIPv4(hostname) {
  return new Promise((resolve, reject) => {
    dns.lookup(hostname, { family: 4 }, (err, address) => {
      if (err) reject(err);
      else resolve(address);
    });
  });
}

async function getTransporter() {
  if (transporter) return transporter;
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;

  // Resolve to an IPv4 address explicitly — some hosts (like Render) can't
  // route to Gmail's IPv6 address, so we connect to the IPv4 IP directly
  // while keeping the original hostname for TLS certificate validation.
  const ipv4Address = await resolveIPv4(SMTP_HOST);

  transporter = nodemailer.createTransport({
    host: ipv4Address,
    port: Number(SMTP_PORT) || 587,
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    tls: {
      servername: SMTP_HOST, // preserves correct SNI/cert matching for the real hostname
    },
  });
  return transporter;
}

export async function sendContactEmail({ name, email, message }) {
  const t = await getTransporter();
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