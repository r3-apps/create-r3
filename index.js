#!/usr/bin/env node
import inquirer from 'inquirer';
import {execa} from 'execa';
import ora from 'ora';
import fs from 'fs-extra';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function createFolderAndCopyTemplate(folderName, templateName) {
    const spinner = ora(`Creating ${folderName} project...`).start();
    const templatePath = path.resolve(__dirname, 'template');
    const destinationPath = path.resolve(process.cwd(), folderName);
    await fs.ensureDir(destinationPath);
    await fs.copy(templatePath, destinationPath);
    spinner.succeed(`Template R3-app copied to the folder '${folderName}'.`);
    console.log(`cd ${folderName} run npm -i or yarn  and npm dev or yarn dev`);
}


const questions = [
    {
        type: 'input',
        name: 'projectName',
        message: 'Enter your project name:',
        validate: (value) => value ? true : 'Please enter a valid project name.',
    },
];

inquirer.prompt(questions).then( async (answers) => {
    const { projectName } = answers;
    const templateName = 'template'; // Default template name
    await createFolderAndCopyTemplate(projectName, templateName);
});