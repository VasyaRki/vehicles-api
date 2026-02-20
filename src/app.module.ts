import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import authConfig from './common/config/auth.config';
import { DatabaseModule } from './database/database.module';
import databaseConfig from './common/config/database.config';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './modules/users/users.module';
import { VehiclesModule } from './modules/vehicles/vehicles.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FilesModule } from './modules/files/files.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [authConfig, databaseConfig],
    }),
    JwtModule,
    DatabaseModule,
    AuthModule,
    UsersModule,
    VehiclesModule,
    FilesModule,
  ],
})
export class AppModule {}
