import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserEntity1771504843834 implements MigrationInterface {
  name = 'UserEntity1771504843834';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "users" (
                "id" SERIAL NOT NULL,
                "email" character varying NOT NULL,
                "password" character varying NOT NULL,
                "username" character varying,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_users_id" PRIMARY KEY ("id")
            )
        `);

    await queryRunner.query(`
            CREATE UNIQUE INDEX "UIDX_users_email"
            ON "users" ("email")
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."UIDX_users_email"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
