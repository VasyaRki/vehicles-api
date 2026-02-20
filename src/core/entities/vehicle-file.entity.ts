import { BaseEntity } from './base.entity';
import { File } from './file.entity';
import { Vehicle } from './vehicle.entity';

export interface VehicleFileData {
  fileId: number;
  vehicleId: number;
}

export interface VehicleFile extends VehicleFileData {
  vehicle: Vehicle;
  file: File;
}
export class VehicleFile extends BaseEntity<Partial<VehicleFileData>> {}
