const { execSync } = require('child_process');

// Set the current processes path to include our node_modules
const npm_bin = execSync("cd ./frontend && npm bin").toString().trim();
process.env.PATH = process.env.PATH + ";" + npm_bin

// Execute concurrently which will provide logging output for our front-end
// and backend
const command = "npm-run-all start:frontend:build:tailwind --parallel start:frontend:watch:tailwind start:frontend:react start:backend"

execSync(command, {stdio: 'inherit'});
