import {
  Controller,
  Post,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { FilesService } from './files.service';
import { UploadedFileOutboundDto, UploadFileInboundDto } from './dto';

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload an image file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadFileInboundDto })
  @ApiResponse({
    status: 201,
    description: 'File uploaded successfully',
    type: UploadedFileOutboundDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid file or no file provided' })
  async upload(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UploadedFileOutboundDto> {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    return this.filesService.save(file);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get file info by id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'File info',
    type: UploadedFileOutboundDto,
  })
  @ApiResponse({ status: 404, description: 'File not found' })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UploadedFileOutboundDto> {
    return this.filesService.findById(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete file by id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'File deleted successfully' })
  @ApiResponse({ status: 404, description: 'File not found' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.filesService.delete(id);
  }
}
