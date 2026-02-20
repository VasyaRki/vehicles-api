import { Module } from '@nestjs/common';
import { JwtModule } from 'src/common/jwt';
import { DataUsersModule } from 'src/data-access/users';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [DataUsersModule, JwtModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
