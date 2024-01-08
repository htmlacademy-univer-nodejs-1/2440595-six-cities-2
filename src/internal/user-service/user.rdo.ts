import {Expose} from 'class-transformer';
import {User} from '../types.js';

export default class UserRdo {
  @Expose()
  public id!: string;

  @Expose()
  public username!: string;

  @Expose()
  public email!: string;

  @Expose()
  public avatar!: string;

  @Expose()
  public type!: User;
}
