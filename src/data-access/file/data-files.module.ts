import { Module } from '@nestjs/common';
import { DataFilesService } from './data-files.service';

@Module({
  providers: [DataFilesService],
  exports: [DataFilesService],
})
export class DataFilesModule {}
