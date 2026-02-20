import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtTypes } from '../enums/jwt-types.enum';
import { JwtOptionsFactory } from './jwt-options.factory';
import { JwtOptions } from '../interfaces/jwt-options.interface';
import { AllConfig } from 'src/common/config/config.type';

@Injectable()
export class JwtAccessOptions implements JwtOptions {
  public readonly ttl: string;
  public readonly secret: string;

  constructor(configService: ConfigService<AllConfig>) {
    this.ttl = configService.getOrThrow('auth.refreshToken.expiresIn', {
      infer: true,
    });
    this.secret = configService.getOrThrow('auth.refreshToken.secret', {
      infer: true,
    });
    JwtOptionsFactory.register(JwtTypes.Access, this);
  }
}
