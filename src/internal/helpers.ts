import { Offer, City, Coordinates, Housing, Facility } from './types.js';

export function generateRandomNumber(min:number, max: number, numAfterDigit = 0): number {
  return +((Math.random() * (max - min)) + min).toFixed(numAfterDigit);
}

export function getRandomItems<T>(items: T[]):T[] {
  const startPosition = generateRandomNumber(0, items.length - 1);
  const endPosition = startPosition + generateRandomNumber(startPosition, items.length);
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
  const [
    title,
    description,
    publishDate,
    city,
    previewImage,
    images,
    isPremium,
    isFavourite,
    rating,
    housingType,
    roomsNumber,
    guestsNumber,
    price,
    facilities,
    authorId,
    commentsIds,
    coordinates
  ] = offerData.replace('\n', '').split('\t');

  const commentsIdsParsed = commentsIds.split(';').filter((comment) => comment.length > 0);
  const stringToBoolean = (s: string): boolean => s === 'true';
  const coordinatesArray = coordinates.split(';').map((coordinate) => parseFloat(coordinate));
  const coordinatesParsed: Coordinates = {latitude: coordinatesArray[0], longitude: coordinatesArray[1]};

  return {
    title,
    description,
    publishDate: new Date(publishDate),
    city: city as City,
    previewImage,
    images:  images.split(';'),
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
  } as Offer;
}
