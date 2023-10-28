import { MigrationInterface, QueryRunner } from "typeorm"

export class Mig1698432445167 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE userss (
                id SERIAL PRIMARY KEY,
                username VARCHAR NOT NULL,
                email VARCHAR UNIQUE NOT NULL,
                password VARCHAR NOT NULL
            );`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
