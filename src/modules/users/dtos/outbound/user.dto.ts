import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/core/entities';

export class UserOutboundDto {
  @ApiProperty()
  email: string;

  public static fromEntity(user: User): UserOutboundDto {
    return {
      email: user.email,
    };
  }
}
