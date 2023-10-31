import { TSVFileReader } from '../file-reader/file-reader.js';
import { CliCommandInterface } from './cli-command.interface';
import chalk from 'chalk';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';

  public execute(filename: string): void {
    if (!filename) {
      console.log(chalk.red('Filename required'));
      return;
    }

    const fileReader = new TSVFileReader(filename.trim());

    try {
      fileReader.read();
      console.log(fileReader.toArray());
    } catch (err) {

      if (!(err instanceof Error)) {
        throw err;
      }

      console.log(err.message);
    }
  }
}
