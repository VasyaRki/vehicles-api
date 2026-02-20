import { BaseEntity } from './base.entity';
import { File } from './file.entity';
import { User } from './user.entity';

export interface VehicleData {
  id: number;
  userId: number;
  imageId: number;
  manufacturer: string;
  model: string;
  description: string;
  vin: string;
  year: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Vehicle extends VehicleData {
  image: any;
  user: User;
  images?: File[];
}

export class Vehicle extends BaseEntity<Partial<VehicleData>> {}
