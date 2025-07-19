import path from 'path';
import fs from 'fs-extra';
import { addToWorkspace } from '../utils/update-workspace';

export const scaffoldService = async (name: string) => {
  const basePath = path.join('services', name);
  const dirs = [
    'domain/aggregates',
    'domain/value-objects',
    'domain/events',
    'domain/services',
    'application/commands',
    'application/queries',
    'interfaces/api',
    'interfaces/graphql',
    'infrastructure/repositories',
    'infrastructure/event-store',
    'infrastructure/projections',
    'tests'
  ];
  for (const dir of dirs) await fs.ensureDir(path.join(basePath, dir));
  await fs.writeFile(path.join(basePath, 'README.md'), `# ${name}\n\nDomain service.`);
  await fs.writeFile(path.join(basePath, '.env.example'), 'DB_URL=\nSECRET=');
  await addToWorkspace(`services/${name}`);
  console.log(`✅ Created service ${name}`);
};
