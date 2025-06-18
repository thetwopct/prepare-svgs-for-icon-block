#!/usr/bin/env node

import inquirer from 'inquirer';
import { processSvgs } from '../lib/process.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const questions = [
	{
		type: 'input',
		name: 'directory',
		message: 'Folder of SVGs:',
		default: process.cwd(),
	},
	{
		type: 'confirm',
		name: 'advanced',
		message: 'Advanced options:',
		default: false,
	}
];

const answers = await inquirer.prompt(questions);

let options = {
	directory: path.resolve(answers.directory),
	framedIcons: false,
	forcePathColor: false,
	fillColor: '#252321'
};

if (answers.advanced) {
	const advancedAnswers = await inquirer.prompt([
		{
			type: 'confirm',
			name: 'framedIcons',
			message: 'Framed Icons - remove fills from outer frame:',
			default: false,
		},
		{
			type: 'confirm',
			name: 'forcePathColor',
			message: 'Force Path color:',
			default: false,
		}
	]);

	options.framedIcons = advancedAnswers.framedIcons;
	options.forcePathColor = advancedAnswers.forcePathColor;

	if (advancedAnswers.forcePathColor) {
		const colorAnswer = await inquirer.prompt([
			{
				type: 'input',
				name: 'fillColor',
				message: 'Fill color for <path>:',
				default: '#252321',
			}
		]);
		options.fillColor = colorAnswer.fillColor;
	}
}

processSvgs(options);