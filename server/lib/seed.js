// Run with `npm run seed` to (re)populate the projects collection.
import db from './db.js';

const projects = [
  {
    id: 'himalayan-kitchen',
    title: 'Himalayan Kitchen',
    status: 'live',
    description:
      'A full-stack restaurant platform with a real reservation workflow, cloud database integration, and administrative reservation management — built to be genuinely sellable to a real restaurant.',
    tags: ['HTML/CSS/JS', 'Node.js', 'Express', 'MongoDB', 'Vercel'],
    features: [
      '~30 dishes across 6 menu categories',
      'Reservation system with server-side validation',
      'Admin view of submitted reservations',
      'Fully responsive, deployed live',
    ],
    links: [
      { label: 'Live Site', url: 'https://restrauntwebsite-kohl.vercel.app/' },
      { label: 'GitHub', url: 'https://github.com/ghorsaineswarup/restraunt_website' },
    ],
  },
  {
    id: 'stonepine-lodge',
    title: 'Stonepine Lodge',
    status: 'live',
    description:
      'A full-stack hotel booking platform for a fictional mountain lodge — authentication, real availability logic, cancellation workflows, and an admin dashboard. A clear step up in backend architecture.',
    tags: ['Node.js', 'Express', 'MongoDB', 'JWT', 'bcrypt', 'Vercel'],
    features: [
      '~19 rooms/cabins with JWT-authenticated accounts',
      'Availability checked against overlapping bookings',
      'Booking creation, confirmation & cancellation',
      'Admin dashboard: stats, room & booking management',
    ],
    links: [
      { label: 'Live Site', url: 'https://stonepinelodge.vercel.app' },
      { label: 'GitHub', url: 'https://github.com/ghorsaineswarup/stonepine_lodge' },
    ],
  },
  {
    id: 'norhta',
    title: 'Norhta',
    status: 'in-progress',
    description:
      'An AI-powered platform in active development. Full details are being finalized — check back soon for the complete case study.',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'AI/LLM'],
    features: [],
    links: [
      { label: 'GitHub', url: 'https://github.com/ghorsaineswarup/norhta' },
    ],
  },
];

db.data.projects = projects;
await db.write();
console.log(`Seeded ${projects.length} projects into data/db.json.`);
