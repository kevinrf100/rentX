import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSpecifications1660862615361 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "specification",
                columns: [
                    { name: "id", type: "uuid" },
                    { name: "name", type: "varchar" },
                    {
                        name: "description",
                        type: "varchar",
                    },
                    { name: "created_at", type: "timestamp", default: "now()" },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("specification");
    }
}
