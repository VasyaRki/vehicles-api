import { Module } from '@nestjs/common';
import { DataUsersService } from './data-users.service';

@Module({
  providers: [DataUsersService],
  exports: [DataUsersService],
})
export class DataUsersModule {}
