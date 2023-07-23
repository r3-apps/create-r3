#!/usr/bin/env node
import inquirer from 'inquirer';
import {execa} from 'execa';
import ora from 'ora';
import fs from 'fs-extra';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import figlet from 'figlet';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const source = 'https://github.com/r3-apps/refine-nextjs'




async function createNextProjectAndInstallRemult(projectName) {

  
    const projectPath = path.resolve(process.cwd(), projectName);
    await fs.ensureDir(projectPath);

    try {
        // Create Next.js app using superplate-cli with refine-antd-nextjs option
          await execa('npx', ['superplate-cli', projectName, '--source', source ], { stdio: 'inherit' });

        // Change to the new project directory
        process.chdir(projectName);
       } catch (error) {
        spinner.fail(`Failed to create project '${projectName}'. Please check the error message and try again.`);
        console.error(error);
    }
}
const questions = [
    {
        type: 'input',
        name: 'projectName',
        message: 'Enter your project name:',
        validate: (value) => value ? true : 'Please enter a valid project name.',
    },
];

inquirer.prompt(questions).then((answers) => {
    const { projectName } = answers;
    createNextProjectAndInstallRemult(projectName);
}).catch((error) => {
    console.error("An error occurred during prompting: ", error);
});
