import { JSONFilePreset } from 'lowdb/node';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '..', 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

fs.mkdirSync(DATA_DIR, { recursive: true });

const defaultData = {
  projects: [],
  posts: [],
  messages: [],
};

const db = await JSONFilePreset(DB_FILE, defaultData);

// Auto-seed on startup if there are no projects yet — covers fresh
// deploys and free-tier hosts that don't persist disk storage between
// restarts, without needing manual shell access to run the seed script.
if (db.data.projects.length === 0) {
  const { default: seedProjects } = await import('./seedData.js');
  db.data.projects = seedProjects;
  await db.write();
  console.log(`Auto-seeded ${seedProjects.length} projects (database was empty on startup).`);
}

export default db;