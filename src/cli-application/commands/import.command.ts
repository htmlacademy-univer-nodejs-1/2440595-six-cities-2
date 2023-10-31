import { TSVFileReader } from '../file-reader/file-reader.js';
import { CliCommandInterface } from './cli-command.interface';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';

  public execute(filename: string): void {
    const fileReader = new TSVFileReader(filename.trim());
    try {
      fileReader.read();
      console.log(fileReader.toArray());
    } catch (exc) {
      if (!(exc instanceof Error)) {
        throw exc;
      }
      console.log(exc.message);
    }
  }
}
