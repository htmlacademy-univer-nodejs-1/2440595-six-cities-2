
import 'reflect-metadata';
import PinoService from './cli-application/logger/pino.service.js';
import Application from './cli-application/rest.js';
import ConfigService from './cli-application/config/config.service.js';
import { Container } from 'inversify';
import { AppComponent } from './internal/types.js';
import { LoggerInterface } from './cli-application/logger/logger.interface.js';
import { ConfigInterface } from './cli-application/config/config.interface.js';
import { RestSchema } from './cli-application/config/rest.schema.js';

async function bootstrap() {
  const container = new Container();
  container.bind<Application>(AppComponent.Application).to(Application).inSingletonScope();
  container.bind<LoggerInterface>(AppComponent.LoggerInterface).to(PinoService).inSingletonScope();
  container.bind<ConfigInterface<RestSchema>>(AppComponent.ConfigInterface).to(ConfigService).inSingletonScope();
  const application = container.get<Application>(AppComponent.Application);
  await application.init();
}

bootstrap();
