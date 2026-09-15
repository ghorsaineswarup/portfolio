import db from './db.js';
import seedProjects from './seedData.js';

db.data.projects = seedProjects;
await db.write();
console.log(`Seeded ${seedProjects.length} projects into data/db.json.`);