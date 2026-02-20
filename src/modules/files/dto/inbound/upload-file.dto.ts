import { ApiProperty } from '@nestjs/swagger';

export class UploadFileInboundDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Image file (jpeg, png, webp, gif). Max size: 5MB',
  })
  file: Express.Multer.File;
}
