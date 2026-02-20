import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPipe } from '../pipes/jwt.pipe';

export const GetAuhtorizationHeaders = createParamDecorator(
  (_, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.headers?.authorization;
  },
);

export const IJwtPayloadDecorator = () => GetAuhtorizationHeaders(JwtPipe);
