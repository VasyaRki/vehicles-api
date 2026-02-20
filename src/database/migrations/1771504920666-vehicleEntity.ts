import { MigrationInterface, QueryRunner } from 'typeorm';

export class VehicleEntity1771504920666 implements MigrationInterface {
  name = 'VehicleEntity1771504920666';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "vehicles" (
                "id" SERIAL NOT NULL,
                "user_id" integer NOT NULL,
                "image_id" integer,
                "manufacturer" character varying,
                "model" character varying,
                "description" character varying,
                "vin" character varying,
                "year" integer,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_vehicles_id" PRIMARY KEY ("id"),
                CONSTRAINT "FK_vehicles_user_id"
                    FOREIGN KEY ("user_id")
                    REFERENCES "users"("id")
                    ON DELETE CASCADE
            )
        `);

    await queryRunner.query(`
            CREATE INDEX "IDX_vehicles_user_id"
            ON "vehicles" ("user_id")
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_vehicles_user_id"`);
    await queryRunner.query(`DROP TABLE "vehicles"`);
  }
}
