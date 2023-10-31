#!/usr/bin/env node
import CliApplication from './cli-application/cli.js';
import HelpCommand from './cli-application/commands/help.command.js';
import VersionCommand from './cli-application/commands/version.command.js';

const myManager = new CliApplication();
myManager.registerCommands([new HelpCommand, new VersionCommand]);
myManager.processCommand(process.argv);
