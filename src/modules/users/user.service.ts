import { Injectable } from '@nestjs/common';
import { User } from 'src/core/entities';
import { DataUsersService } from 'src/data-access/users';

@Injectable()
export class UsersService {
  constructor(private readonly dataUsersService: DataUsersService) {}

  public async getProfileById(userId: number): Promise<User> {
    return this.dataUsersService.findOneById(userId);
  }
}
