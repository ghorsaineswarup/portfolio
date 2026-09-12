import { JSONFilePreset } from 'lowdb/node';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_FILE = path.join(__dirname, '..', 'data', 'db.json');

const defaultData = {
  projects: [],
  posts: [],
  messages: [],
};

const db = await JSONFilePreset(DB_FILE, defaultData);

export default db;