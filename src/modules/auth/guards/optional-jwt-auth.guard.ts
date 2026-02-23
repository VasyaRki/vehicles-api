import {
  Inject,
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JWT_CONSTANTS, JwtService, JwtTypes } from 'src/common/jwt';
import { JwtAuthGuard } from './jwt-auth.guard';

@Injectable()
export class OptionalJwtAuthGuard implements CanActivate {
  constructor(
    @Inject(JWT_CONSTANTS.APPLICATION.SERVICE_TOKEN)
    private jwtService: JwtService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const authorizationHeaders =
      req?.headers?.authorization || req?.connectionParams?.Authorization;

    if (!authorizationHeaders) {
      return true;
    }

    try {
      const accessToken =
        JwtAuthGuard.extractTokenFromAuthorizationHeaders(authorizationHeaders);

      const payload = await this.jwtService.verify(
        accessToken,
        JwtTypes.Access,
      );

      req.user = payload;

      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid access token');
    }
  }
}
