import { Module } from '@nestjs/common';
import { DataVehiclesService } from './data-vehicle-files.service';

@Module({
  providers: [DataVehiclesService],
  exports: [DataVehiclesService],
})
export class DataVehiclesModule {}
