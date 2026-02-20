import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  ArrayNotEmpty,
  IsInt,
} from 'class-validator';

export class CreateVehicleInboundDto {
  @ApiProperty()
  @IsString()
  manufacturer: string;

  @ApiProperty()
  @IsString()
  model: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  year: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  vin?: string;

  @ApiProperty({
    type: [Number],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @Type(() => Number)
  imageIds: number[];
}
