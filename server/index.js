import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import projectsRouter from './routes/projects.js';
import contactRouter from './routes/contact.js';

const app = express();
const PORT = process.env.PORT || 4000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json({ limit: '20kb' }));

app.get('/api/health', (req, res) => res.json({ ok: true }));
app.use('/api/projects', projectsRouter);
app.use('/api/contact', contactRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong on the server.' });
});

app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});