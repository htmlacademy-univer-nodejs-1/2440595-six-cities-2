import { CliCommandInterface } from './commands/cli-command.interface';

type ParsedCommand = {
  [key: string]: string[]
}

export default class CliApplication {
  private cliCommands: {[propertyName: string]: CliCommandInterface} = {};
  private helpCommand = '--help';

  private parseCommand(cliArgs: string[]): ParsedCommand {
    const parsedCommand: ParsedCommand = {};
    let command = '';

    return cliArgs.reduce((acc, item) => {
      if (item.startsWith('--')) {
        acc[item] = [];
        command = item;
      } else if (command && item) {
        acc[command].push(item);
      }

      return acc;
    }, parsedCommand);
  }

  public getCommand(commandName: string): CliCommandInterface {
    return this.cliCommands[commandName] ?? this.cliCommands[this.helpCommand];
  }

  public processCommand(argv: string[]): void {
    const parsedCommand = this.parseCommand(argv);
    const [commandName] = Object.keys(parsedCommand);
    const command = this.getCommand(commandName);
    const commandArguments = parsedCommand[commandName] ?? [];
    command.execute(...commandArguments);
  }

  public registerCommands(commandList: CliCommandInterface[]): void {
    commandList.reduce((acc, command) => {
      acc[command.name] = command;
      return acc;
    }, this.cliCommands);
  }
}
