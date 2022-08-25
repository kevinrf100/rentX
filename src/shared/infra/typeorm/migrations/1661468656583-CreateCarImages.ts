import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCarImages1661468656583 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.createTable();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.dropTable("");
    }
}
