import { Injectable } from '@nestjs/common';

import { BaseCRUDService } from 'src/common/typeorm';
import { VehicleFile } from 'src/core/entities';

@Injectable()
export class DataVehicleFilesService extends BaseCRUDService<VehicleFile> {
  protected entityClass = VehicleFile;
  protected entityAlias = 'vehicle_files';
}
