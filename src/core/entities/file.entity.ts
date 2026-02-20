import { BaseEntity } from './base.entity';

export interface FileData {
  id: number;
  originalName: string;
  fileName: string;
  mimeType: string;
  size: number;
  path: string;
  extension: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface File extends FileData {}
export class File extends BaseEntity<Partial<FileData>> {}
