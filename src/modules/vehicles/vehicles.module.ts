import { Module } from '@nestjs/common';
import { DataVehiclesModule } from 'src/data-access/vehicles';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { JwtModule } from 'src/common/jwt';
import { DataFilesModule } from 'src/data-access/file';
import { DataVehicleFilesModule } from 'src/data-access/vehicle-files';

@Module({
  imports: [
    DataVehiclesModule,
    DataFilesModule,
    JwtModule,
    DataVehicleFilesModule,
  ],
  providers: [VehiclesService],
  controllers: [VehiclesController],
})
export class VehiclesModule {}
