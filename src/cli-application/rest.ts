import { LoggerInterface } from './logger/logger.interface.js';
import { ConfigInterface } from './config/config.interface.js';
import { RestSchema } from './config/rest.schema.js';
import {inject, injectable} from 'inversify';
import {AppComponent} from '../internal/types.js';

@injectable()
export default class RestApplication {
  constructor(@inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
              @inject(AppComponent.ConfigInterface) private readonly config: ConfigInterface<RestSchema>) {
  }

  public async init() {
    this.logger.info('Application init');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
  }
}