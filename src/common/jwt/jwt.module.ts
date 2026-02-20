import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule as NestJwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { JwtAccessOptions } from './factories/jwt-access.options';
import { JwtRefreshOptions } from './factories/jwt-refresh.options';
import { JwtServiceProvider } from './providers/jwt-service.provider';
import { AllConfig } from '../config/config.type';

@Module({
  imports: [
    NestJwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService<AllConfig>): JwtModuleOptions => {
        return {
          secret: config.getOrThrow('auth.accessToken.secret', { infer: true }),
          signOptions: {
            expiresIn: config.getOrThrow('auth.accessToken.expiresIn', {
              infer: true,
            }),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [JwtAccessOptions, JwtRefreshOptions, JwtServiceProvider],
  exports: [JwtServiceProvider],
})
export class JwtModule {}
