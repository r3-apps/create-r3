#!/usr/bin/env node
import inquirer from 'inquirer';
import {execa} from 'execa';
import ora from 'ora';
import fs from 'fs-extra';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function createNextProjectAndInstallRemult(projectName) {
    const spinner = ora(`Creating ${projectName} project...`).start();
    const projectPath = path.resolve(process.cwd(), projectName);
    await fs.ensureDir(projectPath);

    try {
        // Create Next.js app using superplate-cli with refine-antd-nextjs option
        await execa('npx', ['superplate-cli', projectName, '-o', 'refine-antd-nextjs'], { stdio: 'inherit' });

        // Change to the new project directory
        process.chdir(projectName);

        // Install packages
        await execa('npm', ['install', 'remult', 'nookies'], { stdio: 'inherit' });

        // Template and destination paths
        const folders = [
            ['template/api', 'pages/api'],
            ['template/server', 'src/server'],
            ['template/shared', 'src/shared'],
            ['template/providers/dataProvider', 'src/providers/dataProvider'],
            ['template/providers/liveProvider', 'src/providers/liveProvider'],
            ['template/providers/authProvider', 'src/providers/authProvider']
        ];

        // Copy templates to the project directory
        await copyTemplatesToProject(folders);

        spinner.succeed(`Next.js project '${projectName}' created, remult installed and API files copied.`);
        console.log("Enable TypeScript decorators\n" +
            "Add the following entry to the compilerOptions section of the tsconfig.json file to enable the use of decorators in the React app.\n" +
            "\n" +
            "json\n" +
            "// tsconfig.json\n" +
            "\n" +
            "{\n" +
            "...\n" +
            "  \"compilerOptions\": {\n" +
            "    ...\n" +
            "    \"experimentalDecorators\": true // add this\n" +
            "   ...\n" +
            "  }\n" +
            "...\n" +
            "}"
        );
        console.log(`cd ${projectName} and run 'npm run dev' to start the project.`);
    } catch (error) {
        spinner.fail(`Failed to create project '${projectName}'. Please check the error message and try again.`);
        console.error(error);
    }
}

async function copyTemplatesToProject(folders) {
    for (const [src, dest] of folders) {
        const templatePath = path.resolve(__dirname, src);
        const projectPath = path.resolve(dest);
        await fs.ensureDir(projectPath);
        await fs.copy(templatePath, projectPath);
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
