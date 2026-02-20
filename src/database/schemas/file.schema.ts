import { File } from 'src/core/entities/file.entity';
import { EntitySchema } from 'typeorm';

export const FileSchema = new EntitySchema<File>({
  name: 'File',
  target: File,
  tableName: 'files',
  columns: {
    id: {
      generated: true,
      type: 'integer',
      primary: true,
    },
    originalName: {
      type: 'varchar',
      name: 'original_name',
      length: 255,
      nullable: false,
    },
    fileName: {
      type: 'varchar',
      name: 'file_name',
      length: 255,
      nullable: false,
    },
    mimeType: {
      type: 'varchar',
      name: 'mime_type',
      length: 127,
      nullable: false,
    },
    size: {
      type: 'integer',
      nullable: false,
    },
    path: {
      type: 'varchar',
      length: 512,
      nullable: false,
    },
    extension: {
      type: 'varchar',
      length: 16,
      nullable: false,
    },
    createdAt: {
      type: 'timestamptz',
      createDate: true,
      name: 'created_at',
    },
    updatedAt: {
      type: 'timestamptz',
      updateDate: true,
      name: 'updated_at',
    },
  },
});
