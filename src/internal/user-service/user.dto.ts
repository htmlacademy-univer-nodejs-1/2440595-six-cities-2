import { UserType } from '../types.js';

export default class UserDto {
  public email!: string;
  public avatarPath?: string;
  public name!: string;
  public type!: UserType;
  public password!: string;
}
