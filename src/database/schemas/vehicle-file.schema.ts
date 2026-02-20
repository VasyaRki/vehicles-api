import { EntitySchema } from 'typeorm';
import { VehicleFile } from 'src/core/entities/vehicle-file.entity';
import { VehicleSchema } from './vehicle.schema';
import { FileSchema } from './file.schema';

export const VehicleFileSchema = new EntitySchema<VehicleFile>({
  name: 'VehicleFile',
  target: VehicleFile,
  tableName: 'vehicle_files',

  columns: {
    vehicleId: {
      type: 'integer',
      name: 'vehicle_id',
      nullable: false,
      primary: true,
    },
    fileId: {
      type: 'integer',
      name: 'file_id',
      nullable: false,
      primary: true,
    },
  },

  indices: [
    {
      name: 'IDX_vehicle_files_vehicle_id',
      columns: ['vehicleId'],
    },
    {
      name: 'IDX_vehicle_files_file_id',
      columns: ['fileId'],
    },
  ],

  relations: {
    vehicle: {
      type: 'many-to-one',
      target: VehicleSchema,
      joinColumn: { name: 'vehicle_id' },
      onDelete: 'CASCADE',
    },
    file: {
      type: 'many-to-one',
      target: FileSchema,
      joinColumn: { name: 'file_id' },
      onDelete: 'CASCADE',
    },
  },
});
