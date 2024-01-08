import { Expose } from 'class-transformer';

export default class EnteredUserRdo {
  @Expose()
  public token!: string;

  @Expose()
  public email!: string;
}
