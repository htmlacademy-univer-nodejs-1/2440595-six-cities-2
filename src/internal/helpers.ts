import * as crypto from 'node:crypto';
import {Offer, City, Housing, Facility, UserType} from './types.js';
import {ClassConstructor, plainToInstance} from 'class-transformer';

export const DEFAULT_DB_PORT = '27017';
export const DEFAULT_USER_PASSWORD = '123456';
export const MIN_COST = 100;
export const MAX_COST = 100000;
export const MIN_RATING = 1;
export const MAX_RATING = 5;
export const MIN_COUNT = 1;
export const MAX_COUNT = 10;
export const MIN_COUNT_ROOM = 1;
export const MAX_COUNT_ROOM = 8;
export const FIRST_WEEK_DAY = 1;
export const LAST_WEEK_DAY = 7;

export function generateRandomNumber(min:number, max: number, numAfterDigit = 0): number {
  return +((Math.random() * (max - min)) + min).toFixed(numAfterDigit);
}

export function getRandomItems<T>(items: T[]):T[] {
  const startPosition = generateRandomNumber(0, items.length - 1);
  const endPosition = startPosition + 1 + generateRandomNumber(startPosition, items.length);
  return items.slice(startPosition, endPosition);
}

export function getRandomItem<T>(items: T[]):T {
  return items[generateRandomNumber(0, items.length - 1)];
}

export function generateRandomBoolean(): boolean {
  return Math.random() < 0.5;
}

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export function createOffer(offerData: string): Offer {
  const [name,
    description,
    publicationDate,
    city,
    previewImage,
    images,
    premium,
    favorite,
    rating,
    housingType,
    roomCount,
    guestCount,
    cost,
    facilities,
    offerAuthorName,
    offerAuthorAvatar,
    offerAuthorType,
    offerAuthorEmail,
    commentsCount,
    latitude,
    longitude] = offerData.replace('\n', '').split('\t');

  return {
    name: name,
    description: description,
    publicationDate: new Date(publicationDate),
    city: city as unknown as City,
    previewImage: previewImage,
    images: images.split(','),
    premium: premium as unknown as boolean,
    favorite: favorite as unknown as boolean,
    rating: parseFloat(rating),
    housingType: housingType as unknown as Housing,
    roomCount: parseInt(roomCount, 10),
    guestCount: parseInt(guestCount, 10),
    cost: parseInt(cost, 10),
    facilities: facilities.split(',').map((x) => x as unknown as Facility),
    offerAuthor: {
      name: offerAuthorName,
      avatarPath: offerAuthorAvatar,
      type: offerAuthorType as unknown as UserType,
      email: offerAuthorEmail,
    },
    commentsCount: parseInt(commentsCount, 10),
    coordinates: {
      latitude: parseFloat(latitude), longitude: parseFloat(longitude)
    }
  };
}

export const getConnectionString = (
  username: string | number,
  password: string | number,
  host: string,
  port: string | number,
  databaseName: string | number,
): string => `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=admin`;

export const createSHA256 = (line: string, salt: string): string => {
  const hashed = crypto.createHmac('sha256', salt);
  return hashed.update(line).digest('hex');
};

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : '';
}

export function fillDTO<T, V>(someDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDto, plainObject, { excludeExtraneousValues: true });
}

export function createErrorObject(message: string) {
  return {
    error: message,
  };
}
