import { Router } from 'express';
import { randomUUID } from 'node:crypto';
import db from '../lib/db.js';
import { sendContactEmail } from '../lib/mailer.js';

const router = Router();
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const submissionsByIp = new Map();
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function isRateLimited(ip) {
  const now = Date.now();
  const timestamps = (submissionsByIp.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  submissionsByIp.set(ip, timestamps);
  return timestamps.length > MAX_PER_WINDOW;
}

router.post('/', async (req, res) => {
  const { name, email, message, company } = req.body || {};

  // honeypot: real users never fill this in
  if (company) return res.status(201).json({ ok: true });

  if (isRateLimited(req.ip)) {
    return res.status(429).json({ error: 'Too many messages sent recently. Please try again later.' });
  }
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return res.status(400).json({ error: 'Please enter your name.' });
  }
  if (!email || typeof email !== 'string' || !EMAIL_RE.test(email.trim())) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }
  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    return res.status(400).json({ error: 'Please write a message (at least 10 characters).' });
  }

  const entry = {
    id: randomUUID(),
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
    createdAt: new Date().toISOString(),
    read: false,
  };

  db.data.messages.push(entry);
  await db.write();

  sendContactEmail(entry).catch((err) => {
    console.error('Failed to send contact email notification:', err.message);
  });

  res.status(201).json({ ok: true });
});

export default router;