import { Vehicle } from 'src/core/entities';
import { EntitySchema } from 'typeorm';
import { UserSchema } from './user.schema';
import { FileSchema } from './file.schema';

export const VehicleSchema = new EntitySchema<Vehicle>({
  name: 'Vehicle',
  target: Vehicle,
  tableName: 'vehicles',
  columns: {
    id: {
      generated: true,
      type: 'integer',
      primary: true,
    },
    userId: {
      type: 'integer',
      name: 'user_id',
    },
    imageId: {
      type: 'integer',
      name: 'image_id',
    },
    manufacturer: {
      type: 'varchar',
    },
    model: {
      type: 'varchar',
    },
    description: {
      type: 'varchar',
    },
    vin: {
      type: 'varchar',
    },
    year: {
      type: 'integer',
    },
    createdAt: {
      type: 'timestamptz',
      createDate: true,
      name: 'created_at',
    },
    updatedAt: {
      type: 'timestamptz',
      updateDate: true,
      name: 'updated_at',
    },
  },
  indices: [{ name: 'IDX_vehicles_user_id', columns: ['userId'] }],
  relations: {
    user: {
      type: 'many-to-one',
      target: UserSchema,
      joinColumn: { name: 'user_id' },
      onDelete: 'CASCADE',
    },
    image: {
      type: 'many-to-one',
      target: FileSchema,
      joinColumn: { name: 'image_id' },
      onDelete: 'SET NULL',
    },
  },
});
