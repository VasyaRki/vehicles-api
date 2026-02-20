import { ApiProperty } from '@nestjs/swagger';

export class AuthOutboundDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}
