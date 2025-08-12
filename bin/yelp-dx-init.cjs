#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const args = process.argv.slice(2);
if (args.length < 1) {
  console.error('Usage: yelp-dx-init <project-name> [--git] [--no-install]');
  process.exit(1);
}

const projectName = args[0];
const doGit = args.includes('--git');
const noInstall = args.includes('--no-install');

const templateDir = path.resolve(__dirname, '../templates/react-webpack');
const targetDir = path.resolve(process.cwd(), projectName);

if (fs.existsSync(targetDir)) {
  console.error(`❌ Directory "${projectName}" already exists at ${targetDir}`);
  process.exit(1);
}

console.log(`📦 Creating ${targetDir} from ${templateDir} ...`);
fs.mkdirSync(targetDir, { recursive: true });

// recursive copy that ignores node_modules/dist
function copyDir(src, dest) {
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (['node_modules', 'dist', '.git'].includes(entry.name)) continue;
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      fs.mkdirSync(d, { recursive: true });
      copyDir(s, d);
    } else {
      fs.copyFileSync(s, d);
    }
  }
}

copyDir(templateDir, targetDir);

// set package name
const pkgPath = path.join(targetDir, 'package.json');
if (fs.existsSync(pkgPath)) {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  pkg.name = projectName.replace(/[^a-z0-9-_]/gi, '-').toLowerCase();
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
}

if (doGit) {
  console.log('🪄 Initializing git…');
  execSync('git init', { cwd: targetDir, stdio: 'inherit' });
  execSync('git add -A', { cwd: targetDir, stdio: 'inherit' });
  execSync('git commit -m "chore: initial scaffold"', { cwd: targetDir, stdio: 'inherit' });
}

console.log('\n✅ Done!');
console.log(`Next:
  cd ${projectName}
  npm install
  npm run dev
`);
