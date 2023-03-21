import { MigrationInterface, QueryRunner } from "typeorm";

export class createCurrencyMapConverterTable1679345436318 implements MigrationInterface {
    name = 'createCurrencyMapConverterTable1679345436318'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."currency_map_converter_currencycodefrom_enum" AS ENUM('BRL', 'USD', 'EUR', 'INR')`);
        await queryRunner.query(`CREATE TYPE "public"."currency_map_converter_currencycodeto_enum" AS ENUM('BRL', 'USD', 'EUR', 'INR')`);
        await queryRunner.query(`CREATE TABLE "currency_map_converter" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "currencyCodeFrom" "public"."currency_map_converter_currencycodefrom_enum" NOT NULL, "currencyCodeTo" "public"."currency_map_converter_currencycodeto_enum" NOT NULL, "value" numeric(9,2) NOT NULL, "active" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_337c4c74a515e09303b1a7b4880" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_89e89fa7f92538083c1a0161a5" ON "currency_map_converter" ("currencyCodeFrom") `);
        await queryRunner.query(`CREATE INDEX "IDX_52db28ce70bf3eb76d564ea33e" ON "currency_map_converter" ("currencyCodeTo") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_52db28ce70bf3eb76d564ea33e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_89e89fa7f92538083c1a0161a5"`);
        await queryRunner.query(`DROP TABLE "currency_map_converter"`);
        await queryRunner.query(`DROP TYPE "public"."currency_map_converter_currencycodeto_enum"`);
        await queryRunner.query(`DROP TYPE "public"."currency_map_converter_currencycodefrom_enum"`);
    }

}
