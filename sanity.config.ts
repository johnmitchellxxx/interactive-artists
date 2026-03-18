import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './src/sanity/schemaTypes/index';
import { deployTool } from './src/sanity/deployTool';

export default defineConfig({
  name: 'default',
  title: 'Pantheon Interactive',
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID ?? 'wrigijsj',
  dataset: process.env.PUBLIC_SANITY_DATASET ?? 'production',
  plugins: [structureTool(), deployTool()],
  schema: {
    types: schemaTypes,
  },
});
