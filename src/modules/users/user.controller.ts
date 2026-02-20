import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './user.service';
import { IJwtPayloadDecorator, IJwtPayload } from 'src/common/jwt';
import { User } from 'src/core/entities';
import { JwtAuthGuard } from 'src/modules/auth';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  public async me(@IJwtPayloadDecorator() payload: IJwtPayload): Promise<User> {
    return this.usersService.getProfileById(payload.id);
  }
}
