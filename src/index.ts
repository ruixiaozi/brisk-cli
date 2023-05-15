#!/usr/bin/env node
import { execSync } from 'child_process';
import { program } from 'commander';
import path from 'path';
import fs from 'fs';
import projectPackageJson from './package.tpl.json';

const packageJson = require(path.join(__dirname, '../package.json'));

program.name('brisk').description('brisk系列脚手架')
  .version(packageJson.version, '-v, --vers');

program.command('create')
  .argument('<projectName>', 'project name')
  .action((projectName: string) => {
    const dir = process.cwd();
    const projectDir = path.join(dir, projectName);
    fs.mkdirSync(projectDir);
    fs.writeFileSync(path.join(projectDir, 'package.json'), JSON.stringify({
      ...projectPackageJson,
      name: projectName,
    }, undefined, 2));
    fs.cpSync(path.join(__dirname, '../template'), projectDir, { recursive: true });
    fs.renameSync(path.join(projectDir, 'gitignore.tpl'), path.join(projectDir, '.gitignore'));
    execSync('git init', { cwd: projectDir, stdio: 'inherit' });
    execSync('npm i', { cwd: projectDir, stdio: 'inherit' });
    console.log('\n\n\n');
    console.log(`create ${projectName} success!\n`);
    console.log(`1. please cd into '${projectDir}'.`);
    console.log('2. edit the \'src/resource/db.json\' with your mysql info.');
    console.log('3. use cmd: \'npm run start\' start project.');
  });

program.parse();
