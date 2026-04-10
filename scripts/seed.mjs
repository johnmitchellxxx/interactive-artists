import { createClient } from '@sanity/client';

const token = process.env.SANITY_TOKEN;
if (!token) {
  console.error('Error: SANITY_TOKEN is not set in environment.');
  process.exit(1);
}

const client = createClient({
  projectId: 'wrigijsj',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
});

const projects = [
  {
    _type: 'project',
    title: 'Luminous Cascade',
    slug: { _type: 'slug', current: 'luminous-cascade' },
    category: 'Installation',
    description: 'An immersive light installation exploring the flow and transformation of luminous energy through cascading visual elements.',
    order: 1,
  },
  {
    _type: 'project',
    title: 'Touch the Frequency',
    slug: { _type: 'slug', current: 'touch-the-frequency' },
    category: 'Public & Outdoor',
    description: 'An interactive public artwork that translates human touch into visible sound frequencies, bridging the physical and sonic worlds.',
    order: 2,
  },
  {
    _type: 'project',
    title: 'Mirror World',
    slug: { _type: 'slug', current: 'mirror-world' },
    category: 'Corporate Events',
    description: 'A large-scale reflective installation creating infinite parallel realities, inviting viewers to explore their own presence within layered visual dimensions.',
    order: 3,
  },
];

console.log('Seeding Sanity dataset "production" in project "wrigijsj"...\n');

for (const project of projects) {
  try {
    const result = await client.create(project);
    console.log(`Created: "${project.title}" (id: ${result._id})`);
  } catch (err) {
    console.error(`Failed to create "${project.title}":`, err.message);
  }
}

console.log('\nDone.');
