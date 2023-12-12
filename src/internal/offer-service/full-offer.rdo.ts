import { Expose } from 'class-transformer';
import {City, Housing, Coordinates, Facility, User} from '../types.js';

export class FullOfferRdo {
  @Expose()
    name!: string;

  @Expose()
    description!: string;

  @Expose()
    publicationDate!: Date;

  @Expose()
    city!: City;

  @Expose()
    previewImage!: string;

  @Expose()
    images!: string[];

  @Expose()
    premium!: boolean;

  @Expose()
    favorite = true;

  @Expose()
    rating!: number;

  @Expose()
    housingType!: Housing;

  @Expose()
    roomCount!: number;

  @Expose()
    guestCount!: number;

  @Expose()
    cost!: number;

  @Expose()
    facilities!: Facility[];

  @Expose()
    offerAuthor!: User;

  @Expose()
    commentsCount!: number;

  @Expose()
    coordinates!: Coordinates;
}
