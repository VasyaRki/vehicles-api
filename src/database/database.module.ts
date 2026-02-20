import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllConfig } from 'src/common/config/config.type';
import * as schemas from './schemas';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<AllConfig>) => {
        return {
          type: 'postgres',
          host: configService.getOrThrow('database.host', { infer: true }),
          port: configService.getOrThrow('database.port', { infer: true }),
          username: configService.getOrThrow('database.username', {
            infer: true,
          }),
          password: configService.getOrThrow('database.password', {
            infer: true,
          }),
          database: configService.getOrThrow('database.name', { infer: true }),
          entities: [...Object.values(schemas)],
          migrations: ['../migrations/*.ts'],
          synchronize: false,
          migrationsRun: true,
          logging: ['error'],
          maxQueryExecutionTime: 300,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
