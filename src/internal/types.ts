export enum City {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf',
}

export enum UserType {
  Usual = 'Usual',
  Pro = 'Pro',
}

export type User = {
  name: string,
  email: string,
  avatarPath?: string,
  password: string,
  type: UserType,
};

export type Comment = {
  text: string;
  publicationDate: Date;
  rating: number;
  author: User;
}

export type Coordinates = {
  latitude: number,
  longitude: number,
}

export type CityWithCoordinates = {
  [name: string]: Coordinates
}

export enum Facility {
  Breakfast = 'Breakfast',
  AirConditioning = 'AirConditioning',
  LaptopFriendlyWorkspace = 'LaptopFriendlyWorkspace',
  BabySeat = 'BabySeat',
  Washer = 'Washer',
  Towels = 'Towels',
  Fridge = 'Fridge'
}

export enum Housing {
  Apartment = 'Apartment',
  House = 'House',
  Room = 'Room',
  Hotel = 'Hotel'
}

export type Offer = {
  title: string,
  description: string,
  publishDate: Date,
  city: City,
  previewImage: string,
  images: string[],
  isPremium: boolean,
  isFavourite: boolean,
  rating: number,
  housingType: Housing,
  roomsNumber: number,
  guestsNumber: number,
  price: number,
  facilities: Facility[],
  authorId: string,
  commentsIds: string[],
  commentsNumber: number,
  coordinates: Coordinates
}
