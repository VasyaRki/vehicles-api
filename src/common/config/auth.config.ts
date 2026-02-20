/* eslint-disable no-process-env */
import { registerAs } from '@nestjs/config';
import { IsString } from 'class-validator';
import validateConfig from '../validation';

import { AuthConfig } from './config.type';

class EnvironmentVariablesValidator {
  @IsString()
  AUTH_JWT_SECRET: string;

  @IsString()
  AUTH_JWT_TOKEN_EXPIRES_IN: string;

  @IsString()
  AUTH_REFRESH_SECRET: string;

  @IsString()
  AUTH_REFRESH_TOKEN_EXPIRES_IN: string;
}

export default registerAs<AuthConfig>('auth', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    accessToken: {
      secret: process.env.AUTH_JWT_SECRET,
      expiresIn: process.env.AUTH_JWT_TOKEN_EXPIRES_IN,
    },
    refreshToken: {
      secret: process.env.AUTH_REFRESH_SECRET,
      expiresIn: process.env.AUTH_REFRESH_TOKEN_EXPIRES_IN,
    },
  };
});
