import { Injectable, NotFoundException } from '@nestjs/common';
import { extname } from 'path';
import { unlink } from 'fs/promises';
import { File } from 'src/core/entities/file.entity';
import { DataFilesService } from 'src/data-access/file';

@Injectable()
export class FilesService {
  constructor(private readonly dataFilesService: DataFilesService) {}

  async save(multerFile: Express.Multer.File): Promise<File> {
    return this.dataFilesService.save(
      new File({
        originalName: multerFile.originalname,
        fileName: multerFile.filename,
        mimeType: multerFile.mimetype,
        size: multerFile.size,
        path: multerFile.path,
        extension: extname(multerFile.originalname),
      }),
    );
  }

  async findById(id: number): Promise<File> {
    const file = await this.dataFilesService.findOneById(id);

    if (!file) {
      throw new NotFoundException(`File with id ${id} not found`);
    }

    return file;
  }

  async delete(id: number): Promise<void> {
    const file = await this.findById(id);

    await unlink(file.path).catch(() => null);
    await this.dataFilesService.delete({ id });
  }
}
