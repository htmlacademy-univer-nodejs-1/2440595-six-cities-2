import { readFileSync } from 'node:fs';
import { Offer } from '../../internal/types.js';
import { City } from '../../internal/types.js';
import { Housing } from '../../internal/types.js';
import { Facility } from '../../internal/types.js';
import { Coordinates } from '../../internal/types.js';

export interface FileReaderInterface {
  readonly filename: string;
  read(): void;
}

export class TSVFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) {
  }

  public read(): void {
    this.rawData = readFileSync(this.filename, {encoding: 'utf8'});
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('\t'))
      .map(([title, description, publishDate, city, previewImage, images, isPremium, isFavourite, rating, housingType, roomsNumber, guestsNumber, price, facilities, authorId, commentsIds, coordinates]) => {
        const commentsIdsParsed = commentsIds.split(';').filter((comment) => comment.length > 0);
        const stringToBoolean = (s: string): boolean => s === 'true';
        const coordinatesArray = coordinates.split(';').map((coordinate) => parseFloat(coordinate));
        const coordinatesParsed: Coordinates = {latitude: coordinatesArray[0], longitude: coordinatesArray[1]};
        return ({
          title,
          description,
          publishDate: new Date(publishDate),
          city: city as City,
          previewImage,
          images: images.split(';'),
          isPremium: stringToBoolean(isPremium),
          isFavourite: stringToBoolean(isFavourite),
          rating: parseFloat(rating),
          housingType: Housing[housingType as keyof typeof Housing],
          roomsNumber: parseInt(roomsNumber, 10),
          guestsNumber: parseInt(guestsNumber, 10),
          price: parseFloat(price),
          facilities: facilities.split(';').map((facility) => Facility[facility as keyof typeof Facility]),
          authorId,
          commentsIds: commentsIdsParsed,
          commentsNumber: commentsIdsParsed.length,
          coordinates: coordinatesParsed
        });
      });
  }
}
