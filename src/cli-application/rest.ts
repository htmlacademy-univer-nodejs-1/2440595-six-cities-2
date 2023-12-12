import { LoggerInterface } from './logger/logger.interface.js';
import { ConfigInterface } from './config/config.interface.js';
import { ConfigSchema } from './config/config.schema.js';
import {inject, injectable} from 'inversify';
import {AppComponent} from '../internal/types.js';
import {DatabaseClientInterface} from './db-client/database-client.interface.js';
import {getConnectionString} from '../internal/helpers.js';
import express, { Express } from 'express';
import {ControllerInterface} from './controller/controller.interface.js';
import {ExceptionFilter} from './http/exception-filter.interface.js';

@injectable()
export default class RestApplication {
  private expressApplication: Express;
  constructor(@inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
              @inject(AppComponent.ConfigInterface) private readonly config: ConfigInterface<ConfigSchema>,
              @inject(AppComponent.DatabaseClientInterface) private readonly databaseClient: DatabaseClientInterface,
              @inject(AppComponent.OfferController) private readonly offerController: ControllerInterface,
              @inject(AppComponent.UserController) private userController: ControllerInterface,
              @inject(AppComponent.ExceptionFilter) private readonly appExceptionFilter: ExceptionFilter,
  ) {
    this.expressApplication = express();
  }

  private async _initMiddleware() {
    this.expressApplication.use(express.json());
  }

  private async _initServer() {
    this.logger.info('Сервер инициализируется');

    const port = this.config.get('PORT');
    this.expressApplication.listen(port);

    this.logger.info(`Сервер успешно стартовал на http://localhost:${this.config.get('PORT')}`);
  }

  private async _initRoutes() {
    this.logger.info('Контроллеры инициализируются');
    this.expressApplication.use('/offers', this.offerController.router);
    this.expressApplication.use('/users', this.userController.router);
    this.logger.info('Контроллеры успешно инициализированы');
  }

  private async _initExceptionFilters() {
    this.expressApplication.use(this.appExceptionFilter.catch.bind(this.appExceptionFilter));
  }

  public async init() {
    this.logger.info('Приложение инициализировано');
    this.logger.info(`PORT: ${this.config.get('PORT')}`);
    this.logger.info(`DB_HOST: ${this.config.get('DB_HOST')}`);
    this.logger.info(`SALT: ${this.config.get('SALT')}`);

    this.logger.info('База данных инициализируется');
    const mongoUri = getConnectionString(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    await this.databaseClient.connect(mongoUri);
    this.logger.info('База данных инициализирована');
    await this._initRoutes();
    await this._initMiddleware();
    await this._initExceptionFilters();
    await this._initServer();
  }
}
