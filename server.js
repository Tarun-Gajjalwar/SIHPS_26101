const path = require('path');
const fs = require('fs');

const backendDist = path.join(__dirname, 'backend', 'dist', 'index.js');
const backendServer = path.join(__dirname, 'backend', 'server.js');

if (fs.existsSync(backendDist)) {
  console.log('Starting StatSaksham from backend/dist/index.js...');
  require(backendDist);
} else if (fs.existsSync(backendServer)) {
  console.log('Starting StatSaksham from backend/server.js...');
  require(backendServer);
} else {
  console.log('Running via ts-node...');
  require('ts-node/register');
  require('./backend/src/index.ts');
}
