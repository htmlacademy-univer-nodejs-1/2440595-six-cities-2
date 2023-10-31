#!/usr/bin/env node
import CLIApplication from './cli-application/cli.js';
import HelpCommand from './cli-application/commands/help.command';
import ImportCommand from './cli-application/commands/import.command';
import VersionCommand from './cli-application/commands/version.command';

const cliApp = new CLIApplication();
cliApp.registerCommands([new HelpCommand, new VersionCommand, new ImportCommand]);
cliApp.processCommand(process.argv);
