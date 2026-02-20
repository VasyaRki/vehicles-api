import { Injectable } from '@nestjs/common';
import { BaseCRUDService } from 'src/common/typeorm';
import { User } from 'src/core/entities';

@Injectable()
export class DataUsersService extends BaseCRUDService<User> {
  protected entityClass = User;
  protected entityAlias = 'users';
}
