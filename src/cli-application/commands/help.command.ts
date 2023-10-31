import { CliCommandInterface } from './cli-command.interface.js';

export default class HelpCliCommand implements CliCommandInterface {
  public readonly name = '--help';
  public readonly helpMessage = `
        Программа для подготовки данных для REST API сервера.
        Пример:
            main.js --<command> [--arguments]
        Команды:
            --version:                   # выводит номер версии
            --help:                      # печатает этот текст
            --import <path>:             # импортирует данные из TSV
        `;

  public async execute(): Promise<void> {
    console.log(this.helpMessage);
  }
}
