import path from 'path';
import fs from 'fs-extra';
import { addToWorkspace } from '../utils/update-workspace';

export const scaffoldPackage = async (name: string) => {
  const basePath = path.join('packages', name);
  await fs.ensureDir(basePath);
  await fs.writeFile(path.join(basePath, 'index.ts'), 'export {}');
  await fs.writeFile(path.join(basePath, 'README.md'), `# ${name}`);
  await addToWorkspace(`packages/${name}`);
  console.log(`✅ Created package ${name}`);
};
