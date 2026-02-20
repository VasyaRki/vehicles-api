/* eslint-disable no-process-env */
import { registerAs } from '@nestjs/config';
import { IsString, IsUUID } from 'class-validator';

import validateConfig from '../validation';

import { AppConfig } from './config.type';

export enum AppEnv {
  Dev = 'development',
  Stage = 'stage',
  Prod = 'production',
}

class EnvironmentVariablesValidator {}

export default registerAs<AppConfig>('app', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    env: (process.env.NODE_ENV as AppEnv) || AppEnv.Dev,
    port: parseInt(process.env.APP_PORT as string, 10) || 3000,
  };
});
