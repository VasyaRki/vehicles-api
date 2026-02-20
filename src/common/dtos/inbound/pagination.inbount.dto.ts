import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumberString } from 'class-validator';

export class PaginationInboundDto {
  @ApiProperty({ type: 'number', required: false })
  @IsOptional()
  @IsNumberString()
  page?: number;

  @ApiProperty({ type: 'number', required: false })
  @IsOptional()
  @IsNumberString()
  limit?: number;
}
