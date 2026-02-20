/* eslint-disable no-process-env */
import { AppEnv } from './app.config';

export interface AppConfig {
  env: AppEnv;
  port: number;
}

export type AuthConfig = {
  accessToken: {
    secret: string;
    expiresIn: string;
  };
  refreshToken: {
    secret: string;
    expiresIn: string;
  };
};

export type DatabaseConfig = {
  url?: string;
  type?: string;
  host?: string;
  port?: number;
  password?: string;
  name?: string;
  username?: string;
  synchronize?: boolean;
  maxConnections: number;
  sslEnabled?: boolean;
  rejectUnauthorized?: boolean;
  ca?: string;
  key?: string;
  cert?: string;
};

export type AllConfig = {
  app: AppConfig;
  auth: AuthConfig;
  database: DatabaseConfig;
};
