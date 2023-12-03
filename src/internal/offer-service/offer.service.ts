import {inject, injectable} from 'inversify';
import OfferDto from './offer.dto.js';
import {DocumentType, types} from '@typegoose/typegoose';
import {OfferEntity} from './offer.entity.js';
import {OfferServiceInterface} from './offer-service.interface.js';
import {AppComponent} from '../types.js';
import {LoggerInterface} from '../../cli-application/logger/logger.interface.js';
import {UpdateOfferDto} from './update-offer.dto.js';
import {SortType} from '../types.js';
import {CommentServiceInterface} from '../comment-service/comment-service.interface.js';

const MAX_PREMIUM_OFFERS_COUNT = 3;
const MAX_OFFERS_COUNT = 60;

@injectable()
export default class OfferService implements OfferServiceInterface {
  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
    @inject(AppComponent.CommentServiceInterface) private readonly commentService: CommentServiceInterface
  ) {
  }

  public async create(dto: OfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`Новое предложение создано: ${dto.name}`);
    return result;
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    await this.commentService.deleteByOfferId(offerId);
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async find(count: number): Promise<DocumentType<OfferEntity>[]> {
    const limit = count ?? MAX_OFFERS_COUNT;
    return this.offerModel
      .find()
      .sort({createdAt: SortType.Down})
      .populate('userId')
      .limit(limit)
      .exec();
  }


  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findById(offerId)
      .populate('userId')
      .exec();
  }

  public async findPremiumByCity(city: string): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({city: city, premium: true})
      .sort({createdAt: SortType.Down})
      .limit(MAX_PREMIUM_OFFERS_COUNT)
      .populate('userId')
      .exec();
  }

  incComment(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {'$inc': {
        commentsCount: 1,
      }}).exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate('userId')
      .exec();
  }

  public async updateRating(offerId: string, rating: number): Promise<void> {
    await this.offerModel
      .findByIdAndUpdate(offerId, {rating: rating}, {new: true})
      .exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel
      .exists({_id: documentId})) !== null;
  }
}
