import { MigrationInterface, QueryRunner } from 'typeorm';

export class FileEntity1771599988508 implements MigrationInterface {
  name = 'FileEntity1771599988508';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "files" (
        "id" SERIAL NOT NULL,
        "original_name" character varying(255) NOT NULL,
        "file_name" character varying(255) NOT NULL,
        "mime_type" character varying(127) NOT NULL,
        "size" integer NOT NULL,
        "path" character varying(512) NOT NULL,
        "extension" character varying(16) NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_files_id" PRIMARY KEY ("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "files"`);
  }
}
