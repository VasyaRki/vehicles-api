import { ApiProperty } from '@nestjs/swagger';
import { Vehicle } from 'src/core/entities';
import { UserOutboundDto } from 'src/modules/users';

export class VehicleOutboundDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  user: UserOutboundDto;

  @ApiProperty()
  image: any;

  @ApiProperty()
  manufacturer: string;

  @ApiProperty()
  model: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  year: number;

  @ApiProperty()
  createdAt?: Date;

  @ApiProperty()
  updatedAt?: Date;

  public static fromEntity(entity: Vehicle): VehicleOutboundDto {
    return {
      id: entity.id,
      user: UserOutboundDto.fromEntity(entity.user),
      image: entity.image,
      manufacturer: entity.manufacturer,
      model: entity.model,
      year: entity.year,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      description: entity.description.slice(0, 240),
    };
  }
}
