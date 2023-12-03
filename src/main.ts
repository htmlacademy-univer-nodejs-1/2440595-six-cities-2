import 'reflect-metadata';
import Application from './cli-application/rest.js';
import { Container } from 'inversify';
import { AppComponent } from './internal/types.js';
import {createUserContainer} from './internal/user-service/user.container.js';
import {createApplicationContainer} from './cli-application/api.container.js';
import {createOfferContainer} from './internal/offer-service/offer.container.js';
import {createCommentContainer} from './internal/comment-service/comment.container.js';

async function bootstrap() {
  const mainContainer = Container.merge(createApplicationContainer(),
    createUserContainer(),
    createOfferContainer(),
    createCommentContainer());
  const application = mainContainer.get<Application>(AppComponent.Application);
  await application.init();
}

bootstrap();
