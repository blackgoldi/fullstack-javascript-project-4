#!/usr/bin/env node
import { Command } from 'commander';
// import findDiff from '../index.js'

const program = new Command();

program
  .name('page-loader')
  .description('Page loader utility')
  .usage('page-loader [options] <url>')
  .version('1.0.0');
// .option('-V, --format [type]', 'output format')
// .option('-o, --format [type]', 'output format')
// .option('-h, --format [type]', 'output format')
// .arguments('<filepath1> <filepath2>')
// .action((filepath1, filepath2, options) => {
//   console.log(findDiff(filepath1, filepath2, options.format));
// });

program.command();

program.parse();
