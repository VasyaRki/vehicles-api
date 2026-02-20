import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthError } from '../errors/auth.error';
import { JWT_CONSTANTS, JwtTypes, JwtService } from 'src/common/jwt';
import { DomainError } from 'src/common/errors/domain.error';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @Inject(JWT_CONSTANTS.APPLICATION.SERVICE_TOKEN)
    private jwtService: JwtService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const authorizationHeaders =
        req?.headers?.authorization || req?.connectionParams?.Authorization;

      const accessToken =
        JwtAuthGuard.extractTokenFromAuthorizationHeaders(authorizationHeaders);

      this.jwtService.verify(accessToken, JwtTypes.Access);

      return true;
    } catch (err) {
      if (err instanceof DomainError) {
        throw new UnauthorizedException(err.message);
      }

      throw new BadRequestException(err.message);
    }
  }

  public static extractTokenFromAuthorizationHeaders(
    authorizationHeaders: string,
  ): string {
    if (!authorizationHeaders) {
      throw AuthError.AuthorizationHeadersNotProvided();
    }

    const tokenType = authorizationHeaders.split(' ')[0];
    const token = authorizationHeaders.split(' ')[1];

    if (tokenType !== 'Bearer' || !token) {
      throw AuthError.InvalidAuthHeaders();
    }

    return token;
  }
}
