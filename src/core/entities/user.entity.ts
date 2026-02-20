import { BaseEntity } from './base.entity';

export interface UserData {
  id: number;
  email: string;
  password: string;
  username: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface User extends UserData {}
export class User extends BaseEntity<Partial<UserData>> {}
