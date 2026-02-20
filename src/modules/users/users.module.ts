import { Module } from '@nestjs/common';
import { DataUsersModule } from 'src/data-access/users';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';
import { JwtModule } from 'src/common/jwt/jwt.module';

@Module({
  imports: [DataUsersModule, JwtModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
