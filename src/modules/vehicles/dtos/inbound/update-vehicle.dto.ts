import { PartialType } from '@nestjs/swagger';
import { CreateVehicleInboundDto } from './create-vehicle.dto';

export class UpdateVehicleInboundDto extends PartialType(
  CreateVehicleInboundDto,
) {}
