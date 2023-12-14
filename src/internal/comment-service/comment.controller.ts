import {Request, Response} from 'express';
import {inject, injectable} from 'inversify';
import {Controller} from '../../cli-application/controller/controller.abstract.js';
import {AppComponent, HttpMethod} from '../types.js';
import {LoggerInterface} from '../../cli-application/logger/logger.interface.js';
import {CommentServiceInterface} from './comment-service.interface.js';
import CreateCommentDto from './create-comment.dto.js';
import {fillDTO} from '../helpers.js';
import CommentRdo from './comment.rdo.js';
import {DtoValidateMiddleware} from '../../cli-application/middleware/dto.validate.middleware.js';
import {DocumentExistsMiddleware} from '../../cli-application/middleware/doc.exists.middleware.js';
import {OfferServiceInterface} from '../offer-service/offer-service.interface.js';


@injectable()
export default class CommentController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(AppComponent.CommentServiceInterface) private readonly commentService: CommentServiceInterface,
    @inject(AppComponent.OfferServiceInterface) private readonly offerService: OfferServiceInterface,
  ) {
    super(logger);

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new DtoValidateMiddleware(CreateCommentDto),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
  }

  public async create({body}: Request<object, object, CreateCommentDto>, res: Response): Promise<void> {
    const comment = await this.commentService.createForOffer(body);
    this.created(res, fillDTO(CommentRdo, comment));
  }
}
