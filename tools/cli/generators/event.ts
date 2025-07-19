import path from 'path';
import fs from 'fs-extra';

export const scaffoldEvent = async (name: string) => {
  const eventPath = path.join('packages/domain-events', `${name}.ts`);
  const content = `export const ${name} = {
  type: '${name}',
  schema: {}, // TODO: define schema
};\n`;
  await fs.writeFile(eventPath, content);
  console.log(`✅ Created domain event: ${name}`);
};
