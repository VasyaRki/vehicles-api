import { Injectable } from '@nestjs/common';
import { BaseCRUDService } from 'src/common/typeorm';
import { File } from 'src/core/entities';

@Injectable()
export class DataFilesService extends BaseCRUDService<File> {
  protected entityClass = File;
  protected entityAlias = 'Files';
}
