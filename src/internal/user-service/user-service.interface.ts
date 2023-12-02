import {DocumentType} from '@typegoose/typegoose';
import UserDto from './user.dto.js';
import {UserEntity} from './user.entity.js';

export interface UserServiceInterface {
  create(dto: UserDto, salt: string): Promise<DocumentType<UserEntity>>;

  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;

  findOrCreate(dto: UserDto, salt: string): Promise<DocumentType<UserEntity>>;
}
