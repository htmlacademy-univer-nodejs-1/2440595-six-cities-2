import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import {AppComponent} from '../types.js';
import {Controller} from '../../cli-application/controller/controller.abstract.js';
import {LoggerInterface} from '../../cli-application/logger/logger.interface.js';
import {HttpMethod} from '../types.js';
import {fillDTO} from '../helpers.js';
import {UserServiceInterface} from './user-service.interface.js';
import CreateUserDto from './user.dto.js';
import {HttpError} from '../../cli-application/http/http.error.js';
import {StatusCodes} from 'http-status-codes';
import {ConfigInterface} from '../../cli-application/config/config.interface.js';
import {ConfigSchema} from '../../cli-application/config/config.schema.js';
import UserRdo from './user.rdo.js';
import LoginUserDto from './login-user.dto.js';
import {FullOfferRdo} from '../offer-service/full-offer.rdo.js';
import {ValidateObjectIdMiddleware} from '../../cli-application/middleware/object-id.validate.middleware.js';
import {UploadMiddleware} from '../../cli-application/middleware/upload.middleware.js';


@injectable()
export default class UserController extends Controller {
  constructor(@inject(AppComponent.LoggerInterface) logger: LoggerInterface,
              @inject(AppComponent.OfferServiceInterface) private readonly userService: UserServiceInterface,
              @inject(AppComponent.ConfigInterface) private readonly configService: ConfigInterface<ConfigSchema>
  ) {
    super(logger);

    this.logger.info('Register routes for CategoryController…');

    this.addRoute({path: '/register', method: HttpMethod.Get, handler: this.register});
    this.addRoute({path: '/login', method: HttpMethod.Post, handler: this.login});
    this.addRoute({path: '/logout', method: HttpMethod.Post, handler: this.logout});
    this.addRoute({
      path: '/:userId/avatar',
      method: HttpMethod.Post,
      handler: this.uploadAvatar,
      middlewares: [
        new ValidateObjectIdMiddleware('userId'),
        new UploadMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'avatar'),
      ]
    });
    this.addRoute({path: '/favorite/:offerId', method: HttpMethod.Post, handler: this.addFavorite});
    this.addRoute({path: '/favorite/:offerId', method: HttpMethod.Delete, handler: this.deleteFavorite});
    this.addRoute({path: '/favorite', method: HttpMethod.Get, handler: this.getFavorite});
  }

  public async register(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateUserDto>,
    res: Response): Promise<void> {
    const user = await this.userService.findByEmail(body.email);

    if (user) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email ${body.email} already exists.`,
        'UserController'
      );
    }

    const result = await this.userService.create(body, this.configService.get('SALT'));
    this.created(res, fillDTO(UserRdo, result));
  }

  public async login(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, LoginUserDto>,
    _res: Response,
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (! existsUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        `User with email ${body.email} not found.`,
        'UserController',
      );
    }

    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'UserController',
    );
  }

  public async logout(_req: Request, _res: Response): Promise<void> {
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'UserController',
    );
  }

  public async getFavorite({body}: Request<Record<string, unknown>, Record<string, unknown>, {userId: string}>, _res: Response): Promise<void> {
    const result = await this.userService.findFavorites(body.userId);
    this.ok(_res, fillDTO(FullOfferRdo, result));
  }

  public async addFavorite({body}: Request<Record<string, unknown>, Record<string, unknown>, {offerId: string, userId: string}>, res: Response): Promise<void> {
    await this.userService.addToFavoritesById(body.offerId, body.userId);
    this.noContent(res, {message: 'Предложение добавлено в избранное'});
  }

  public async deleteFavorite({body}: Request<Record<string, unknown>, Record<string, unknown>, {offerId: string, userId: string}>, res: Response): Promise<void> {
    await this.userService.removeFromFavoritesById(body.offerId, body.userId);
    this.noContent(res, {message: 'Предложение удалено из избранного'});
  }

  public async uploadAvatar(req: Request, res: Response) {
    this.created(res, {filepath: req.file?.path});
  }
}
