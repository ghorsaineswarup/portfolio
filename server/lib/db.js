import { JSONFilePreset } from 'lowdb/node';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '..', 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// Ensure the data folder exists — it's not tracked by git (db.json is
// gitignored, and git doesn't track empty folders), so on a fresh clone
// (like Render's deploys) this directory won't exist until we create it.
fs.mkdirSync(DATA_DIR, { recursive: true });

const defaultData = {
  projects: [],
  posts: [],
  messages: [],
};

// A single shared lowdb instance. JSONFilePreset creates the file
// (with defaultData) if it doesn't exist yet, and loads it if it does.
const db = await JSONFilePreset(DB_FILE, defaultData);

export default db;