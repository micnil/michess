import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Find all coverage-final.json files
const coverageFiles = execSync('find coverage -name "coverage-final.json"', { encoding: 'utf8' })
  .trim()
  .split('\n')
  .filter(Boolean);

if (coverageFiles.length === 0) {
  console.error('No coverage files found. Run tests with --coverage first.');
  process.exit(1);
}

// Create .nyc_output directory
fs.mkdirSync('.nyc_output', { recursive: true });

// Copy files with unique names
coverageFiles.forEach(file => {
  const uniqueName = file.replace(/\//g, '_');
  fs.copyFileSync(file, path.join('.nyc_output', uniqueName));
});

console.log(`Merging ${coverageFiles.length} coverage files...`);

// Run nyc report
execSync('npx nyc report', { stdio: 'inherit' });

// Cleanup
fs.rmSync('.nyc_output', { recursive: true, force: true });
