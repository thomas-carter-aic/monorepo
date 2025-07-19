import fs from 'fs-extra';
import path from 'path';
import YAML from 'yaml';

export async function addToWorkspace(pathToAdd: string) {
  const workspacePath = path.resolve('pnpm-workspace.yaml');
  const content = await fs.readFile(workspacePath, 'utf8');
  const doc = YAML.parse(content);

  if (!doc.packages.includes(pathToAdd)) {
    doc.packages.push(pathToAdd);
    await fs.writeFile(workspacePath, YAML.stringify(doc));
    console.log(`✅ Added ${pathToAdd} to pnpm-workspace.yaml`);
  }
}
