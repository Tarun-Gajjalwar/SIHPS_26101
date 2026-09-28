const path = require('path');
const fs = require('fs');

// Check for compiled TypeScript output
const distPath = path.join(__dirname, 'dist', 'index.js');

if (fs.existsSync(distPath)) {
  console.log('Starting StatSaksham backend from dist/index.js...');
  require(distPath);
} else {
  console.log('dist/index.js not found, running with ts-node...');
  try {
    require('ts-node/register');
    require(path.join(__dirname, 'src', 'index.ts'));
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}
