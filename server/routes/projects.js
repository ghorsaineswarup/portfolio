import { Router } from 'express';
import { randomUUID } from 'node:crypto';
import db from '../lib/db.js';

const router = Router();

function requireAdmin(req, res, next) {
  const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  if (!process.env.ADMIN_TOKEN || token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

router.get('/', (req, res) => {
  res.json(db.data.projects);
});

router.get('/:id', (req, res) => {
  const project = db.data.projects.find((p) => p.id === req.params.id);
  if (!project) return res.status(404).json({ error: 'Project not found' });
  res.json(project);
});

router.post('/', requireAdmin, async (req, res) => {
  const { title, status, description, tags, features, links } = req.body || {};
  if (!title || typeof title !== 'string') {
    return res.status(400).json({ error: 'title is required' });
  }
  const project = {
    id: randomUUID(),
    title,
    status: status === 'in-progress' ? 'in-progress' : 'live',
    description: description || '',
    tags: Array.isArray(tags) ? tags : [],
    features: Array.isArray(features) ? features : [],
    links: Array.isArray(links) ? links : [],
  };
  db.data.projects.push(project);
  await db.write();
  res.status(201).json(project);
});

router.put('/:id', requireAdmin, async (req, res) => {
  const project = db.data.projects.find((p) => p.id === req.params.id);
  if (!project) return res.status(404).json({ error: 'Project not found' });
  Object.assign(project, req.body || {}, { id: project.id });
  await db.write();
  res.json(project);
});

router.delete('/:id', requireAdmin, async (req, res) => {
  const before = db.data.projects.length;
  db.data.projects = db.data.projects.filter((p) => p.id !== req.params.id);
  if (db.data.projects.length === before) {
    return res.status(404).json({ error: 'Project not found' });
  }
  await db.write();
  res.status(204).end();
});

export default router;