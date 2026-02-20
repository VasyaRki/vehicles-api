import { ApiProperty } from '@nestjs/swagger';
import { File } from 'src/core/entities';

export class UploadedFileOutboundDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'photo.jpg' })
  originalName: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000.jpg' })
  fileName: string;

  @ApiProperty({ example: 'image/jpeg' })
  mimeType: string;

  @ApiProperty({ example: 204800 })
  size: number;

  @ApiProperty({ example: 'uploads/550e8400-e29b-41d4-a716-446655440000.jpg' })
  path: string;

  @ApiProperty({ example: '.jpg' })
  extension: string;

  public static fromEntity(file: File): UploadedFileOutboundDto {
    return {
      id: file.id,
      originalName: file.originalName,
      fileName: file.fileName,
      mimeType: file.mimeType,
      size: file.size,
      path: file.path,
      extension: file.extension,
    };
  }
}
