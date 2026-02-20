import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiBody,
  ApiOkResponse,
  ApiExtraModels,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthOutboundDto, LoginInboundDto, RegisterInboundDto } from './dtos';

@ApiTags('Auth')
@ApiExtraModels(AuthOutboundDto)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: LoginInboundDto })
  @ApiOkResponse({ type: AuthOutboundDto })
  @Post('login')
  public async login(@Body() body: LoginInboundDto): Promise<AuthOutboundDto> {
    return this.authService.login(body);
  }

  @ApiBody({ type: RegisterInboundDto })
  @ApiOkResponse({ type: AuthOutboundDto })
  @Post('register')
  public async register(
    @Body() body: RegisterInboundDto,
  ): Promise<AuthOutboundDto> {
    return this.authService.register(body);
  }
}
