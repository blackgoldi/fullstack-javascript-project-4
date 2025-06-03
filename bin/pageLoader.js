#!/usr/bin/env node
import { Command } from "commander";
import loader from "../index.js";

const program = new Command();

program
  .usage("[options] <url>")
  .description("Page loader utility")
  .version("1.0.0")
  .option("-o, --output [dir]", 'output dir (default: "/home/user/current-dir")', process.cwd())
  .argument("<url>")
  .action((url, options) => {
    loader(url, options.output);
  });

program.parse();
