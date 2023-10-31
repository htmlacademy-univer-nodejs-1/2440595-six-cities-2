import { CliCommandInterface } from './cli-command.interface.js';
import path from 'node:path';
import { readFileSync } from 'node:fs';

export default class VersionCliCommand implements CliCommandInterface {
  public readonly name = '--version';

  public async execute(): Promise<void> {
    console.log(JSON.parse(readFileSync(path.resolve('./package.json'), 'utf-8')).version);
  }
}
