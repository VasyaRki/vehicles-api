import { ApiProperty } from '@nestjs/swagger';
import { Vehicle } from 'src/core/entities';
import { maskVin } from 'src/shared/utils';
import { UploadedFileOutboundDto } from 'src/modules/files';
import { File } from 'src/core/entities';
import { UserOutboundDto } from 'src/modules/users';

export class VehicleDetailOutboundDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  user: UserOutboundDto;

  @ApiProperty()
  images: UploadedFileOutboundDto[];

  @ApiProperty()
  manufacturer: string;

  @ApiProperty()
  model: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  year: number;

  @ApiProperty()
  vin: string;

  @ApiProperty()
  createdAt?: Date;

  @ApiProperty()
  updatedAt?: Date;

  public static fromEntity(
    entity: Vehicle,
    currentUserId: number,
    images: File[],
  ): VehicleDetailOutboundDto {
    const isAuthor = currentUserId === entity.userId;

    return {
      id: entity.id,
      user: entity.user ? UserOutboundDto.fromEntity(entity.user) : null,
      images: images.map((i) => UploadedFileOutboundDto.fromEntity(i)),
      manufacturer: entity.manufacturer,
      model: entity.model,
      year: entity.year,
      vin: isAuthor ? entity.vin : maskVin(entity.vin),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      description: entity.description,
    };
  }
}
