#!/usr/bin/env node
import yargs from 'yargs';
import chalk from 'chalk';
import figlet from 'figlet';

const { argv } = yargs.options({
  a: { type: 'boolean', default: false },
  b: { type: 'string', demandOption: true },
  c: { type: 'number', alias: 'chill' },
  d: { type: 'array' },
  e: { type: 'count' },
  f: { choices: ['1', '2', '3'] },
});

console.log(chalk.green(figlet.textSync('ts-cli-starter')));

console.log('Hello World');

console.info(argv);

console.info(chalk.green('Green text'));
