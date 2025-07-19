import path from 'path';
import fs from 'fs-extra';
import { addToWorkspace } from '../utils/update-workspace';

export const scaffoldApp = async (name: string) => {
  const basePath = path.join('apps', name);
  const dirs = ['pages', 'components', 'hooks', 'services'];
  for (const dir of dirs) await fs.ensureDir(path.join(basePath, dir));
  await fs.writeFile(path.join(basePath, 'README.md'), `# ${name}\n\nPortal app.`);
  await fs.writeFile(path.join(basePath, '.env.example'), 'NEXT_PUBLIC_API_URL=');
  await addToWorkspace(`apps/${name}`);
  console.log(`✅ Created app ${name}`);
};
