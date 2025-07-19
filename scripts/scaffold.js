#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const prompts = require('prompts');

// Utility: Create file if not exists
const write = (filepath, content) => {
  if (!fs.existsSync(filepath)) {
    fs.writeFileSync(filepath, content);
  }
};

// Update pnpm-workspace.yaml
const updateWorkspaceYaml = (dir) => {
  const yamlPath = path.resolve('pnpm-workspace.yaml');
  if (!fs.existsSync(yamlPath)) return;

  const lines = fs.readFileSync(yamlPath, 'utf-8').split('\n');
  const insertIndex = lines.findIndex((line) => line.trim().startsWith('packages:')) + 1;

  if (!lines.some((line) => line.includes(dir))) {
    lines.splice(insertIndex, 0, `  - "${dir}"`);
    fs.writeFileSync(yamlPath, lines.join('\n'));
    console.log(`📦 Added '${dir}' to pnpm-workspace.yaml`);
  }
};

// Update README.md
const updateReadme = (type, name) => {
  const readmePath = path.resolve('README.md');
  const sectionHeader = type === 'app' ? '## 🧩 Apps' : '## 🧱 Packages';
  const bullet = `- [${name}](./${type === 'app' ? 'apps' : 'packages'}/${name})`;

  if (!fs.existsSync(readmePath)) return;

  let content = fs.readFileSync(readmePath, 'utf-8');

  if (!content.includes(sectionHeader)) {
    content += `\n\n${sectionHeader}\n${bullet}\n`;
  } else if (!content.includes(bullet)) {
    content = content.replace(
      new RegExp(`${sectionHeader}\\n`),
      `${sectionHeader}\n${bullet}\n`
    );
  }

  fs.writeFileSync(readmePath, content);
  console.log(`📝 Updated README.md with ${name}`);
};

// Generate framework templates
const writeTemplateCode = (type, name, framework) => {
  const basePath = path.join(type === 'app' ? 'apps' : 'packages', name);
  fs.mkdirSync(basePath, { recursive: true });

  if (framework === 'next') {
    fs.mkdirSync(`${basePath}/pages`, { recursive: true });
    write(`${basePath}/pages/index.tsx`, `
export default function Home() {
  return <h1>Welcome to ${name} (Next.js)</h1>;
}`.trim());

    write(`${basePath}/package.json`, JSON.stringify({
      name,
      private: true,
      scripts: {
        dev: 'next dev',
        build: 'next build',
        start: 'next start'
      },
      dependencies: {
        next: 'latest',
        react: 'latest',
        'react-dom': 'latest'
      }
    }, null, 2));
  }

  else if (framework === 'express') {
    fs.mkdirSync(`${basePath}/src`, { recursive: true });
    write(`${basePath}/src/index.ts`, `
import express from 'express';
const app = express();
app.get('/', (_, res) => res.send('Hello from ${name}!'));
app.listen(3000, () => console.log('🚀 ${name} running on http://localhost:3000'));
    `.trim());

    write(`${basePath}/package.json`, JSON.stringify({
      name,
      private: true,
      scripts: {
        dev: 'nodemon src/index.ts',
        start: 'node dist/index.js'
      },
      dependencies: { express: 'latest' },
      devDependencies: {
        typescript: '^5',
        'ts-node': '^10',
        nodemon: '^2',
        '@types/express': '^4'
      }
    }, null, 2));
  }

  else if (framework === 'vite') {
    fs.mkdirSync(`${basePath}/src`, { recursive: true });
    write(`${basePath}/src/main.tsx`, `
import React from 'react';
import ReactDOM from 'react-dom/client';

const App = () => <h1>${name} (Vite + React)</h1>;
ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
    `.trim());

    write(`${basePath}/index.html`, `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>${name}</title></head>
<body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body>
</html>
    `.trim());

    write(`${basePath}/package.json`, JSON.stringify({
      name,
      private: true,
      scripts: {
        dev: 'vite',
        build: 'vite build',
        preview: 'vite preview'
      },
      dependencies: {
        react: 'latest',
        'react-dom': 'latest'
      },
      devDependencies: {
        vite: 'latest',
        '@vitejs/plugin-react': 'latest',
        typescript: '^5'
      }
    }, null, 2));
  }

  else {
    // default minimal setup
    const pkg = {
      name: type === 'app' ? name : `@yourorg/${name}`,
      private: true,
      version: '0.1.0',
    };

    if (type === 'app') {
      pkg.scripts = {
        dev: `echo Starting ${name}...`,
        build: `echo Building ${name}...`
      };
    } else {
      pkg.main = 'src/index.ts';
      pkg.types = 'src/index.ts';
    }

    fs.mkdirSync(`${basePath}/src`, { recursive: true });
    write(`${basePath}/src/index.ts`, `// Entry point for ${name}`);
    write(`${basePath}/package.json`, JSON.stringify(pkg, null, 2));
  }

  write(`${basePath}/README.md`, `# ${name}\n\nScaffolded ${type}.`);

  if (type === 'app') {
    write(`${basePath}/.env.example`, `# .env.example for ${name}`);
  }
};

// MAIN CLI
(async () => {
  const response = await prompts([
    {
      type: 'select',
      name: 'type',
      message: 'What would you like to create?',
      choices: [
        { title: 'App', value: 'app' },
        { title: 'Package', value: 'package' }
      ]
    },
    {
      type: 'text',
      name: 'name',
      message: 'Enter the name:'
    },
    {
      type: prev => prev === 'app' ? 'select' : null,
      name: 'framework',
      message: 'Choose a framework (for apps):',
      choices: [
        { title: 'None (empty)', value: 'none' },
        { title: 'Next.js', value: 'next' },
        { title: 'Express', value: 'express' },
        { title: 'Vite + React', value: 'vite' }
      ]
    }
  ]);

  const { type, name, framework = 'none' } = response;

  if (!name) return console.log('❌ No name provided. Exiting.');

  const dir = type === 'app' ? `apps/${name}` : `packages/${name}`;
  if (fs.existsSync(dir)) {
    return console.log(`⚠️ ${type} '${name}' already exists at ${dir}`);
  }

  writeTemplateCode(type, name, framework);
  updateWorkspaceYaml(dir);
  updateReadme(type, name);

  console.log(`🎉 Done! ${type} '${name}' scaffolded at ${dir}`);
})();
