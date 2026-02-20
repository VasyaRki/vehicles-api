import { DomainError } from '../../errors/domain.error';

export class JwtError extends DomainError {
  constructor(name: string, message: string) {
    super(name, message);
  }

  public static InvalidJwtError(): JwtError {
    return new JwtError('InvalidJwtError', 'Invalid Jwt Error');
  }

  public static InvalidRefreshJwtError(): JwtError {
    return new JwtError('InvalidRefreshJwtError', 'Invalid Refresh Jwt Error');
  }
}
