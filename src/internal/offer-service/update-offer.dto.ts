import {City, Housing, Facility, Coordinates} from '../types.js';
export class UpdateOfferDto {
  public name!: string;
  public description!: string;
  public publicationDate!: Date;
  public city!: City;
  public previewImage!: string;
  public images!: string[];
  public premium!: boolean;
  public favorite!: boolean;
  public rating!: number;
  public housingType!: Housing;
  public roomCount!: number;
  public guestCount!: number;
  public cost!: number;
  public facilities!: Facility[];
  public userId!: string;
  public commentsCount!: number;
  public coordinates!: Coordinates;
}
