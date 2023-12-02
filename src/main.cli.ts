#!/usr/bin/env node
import CLIApplication from './cli-application/cli.js';
import HelpCommand from './cli-application/commands/help.command.js';
import ImportCommand from './cli-application/commands/import.command.js';
import VersionCommand from './cli-application/commands/version.command.js';
import GenerateCommand from './cli-application/commands/generate.command.js';
import 'reflect-metadata';

const cliApp = new CLIApplication();
cliApp.registerCommands([new HelpCommand, new VersionCommand, new ImportCommand, new GenerateCommand]);
cliApp.processCommand(process.argv);
