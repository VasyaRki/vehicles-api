import { MigrationInterface, QueryRunner } from 'typeorm';

export class VehicleFileEntity1771600006198 implements MigrationInterface {
  name = 'VehicleFileEntity1771600006198';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "vehicle_files" (
        "vehicle_id" integer NOT NULL,
        "file_id" integer NOT NULL,
        CONSTRAINT "PK_vehicle_files" PRIMARY KEY ("vehicle_id", "file_id"),
        CONSTRAINT "FK_vehicle_files_vehicle_id"
          FOREIGN KEY ("vehicle_id")
          REFERENCES "vehicles"("id")
          ON DELETE CASCADE,
        CONSTRAINT "FK_vehicle_files_file_id"
          FOREIGN KEY ("file_id")
          REFERENCES "files"("id")
          ON DELETE CASCADE
      )
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_vehicle_files_vehicle_id"
      ON "vehicle_files" ("vehicle_id")
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_vehicle_files_file_id"
      ON "vehicle_files" ("file_id")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_vehicle_files_file_id"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_vehicle_files_vehicle_id"`,
    );
    await queryRunner.query(`DROP TABLE "vehicle_files"`);
  }
}
