const { execSync } = require('child_process');

// Set the current processes path to include our node_modules
const npm_bin = execSync("cd ./frontend && npm bin").toString().trim();
process.env.PATH = process.env.PATH + ";" + npm_bin

// Execute concurrently which will provide logging output for our front-end
// and backend
const command = [
  'concurrently -s first --kill-others --names API,CLIENT -c blue,magenta',
  '"cd ./backend && cross-env NODE_PATH=../frontend/node_modules/ ASPNETCORE_ENVIRONMENT=Development dotnet watch run"',
  '"cd ./frontend/ && npm run start"'
]

execSync(command.join(' '), {stdio: 'inherit'});
