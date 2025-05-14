#!/usr/bin/env node
import { Command } from 'commander';
import loader from '../src/loader.js';
// import findDiff from '../index.js'

const program = new Command();

program
  // .description('Page loader utility')
  .usage('[options] <url>')
  .description('Page loader utility')
  .version('1.0.0')
  .option('-o, --output [dir]', 'output dir (default: "/home/user/current-dir")', process.cwd())
  .argument('<url>')
  .action((url,options) => {
    loader(url,options.output);
  });

program.parse();