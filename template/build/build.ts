import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

execSync('npx ttsc');
execSync('npx ncc build ./dist/js/index.js -o dist/ncc --target es5');
execSync('npx ncc build ./dist/js/launcher.js -o dist/ --target es5');
execSync('npx uglifyjs dist/ncc/index.js -o dist/main.js');
execSync('npx uglifyjs dist/index.js -o dist/launcher.js');
execSync('npx bytenode --compile dist/main.js');
execSync('npx rimraf ./dist/js ./dist/ncc ./dist/main.js ./dist/index.js ./dist/cli.js');

const packageJson = require(path.join(__dirname, '../package.json'));
fs.writeFileSync(path.join(__dirname, '../dist/package.json'), JSON.stringify({
  name: packageJson.name,
  version: packageJson.version,
  description: packageJson.description,
  scripts: {
    start: `node launcher.js --model=production`,
  },
}, undefined, 2));

execSync('npx copyfiles ./src/resources/**/* ./dist');
