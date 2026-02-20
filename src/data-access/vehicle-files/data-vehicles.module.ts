import { Module } from '@nestjs/common';

import { DataVehicleFilesService } from './data-vehicles.service';

@Module({
  providers: [DataVehicleFilesService],
  exports: [DataVehicleFilesService],
})
export class DataVehicleFilesModule {}
