import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateDefaultValuesFromCurrencyMapConverter1679349120810 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`insert into "currency_map_converter" ("currencyCodeFrom", "currencyCodeTo", "value", "active") values ('USD', 'BRL', 5.24, true)`);
        await queryRunner.query(`insert into "currency_map_converter" ("currencyCodeFrom", "currencyCodeTo", "value", "active") values ('EUR', 'BRL', 5.61, true)`);
        await queryRunner.query(`insert into "currency_map_converter" ("currencyCodeFrom", "currencyCodeTo", "value", "active") values ('INR', 'BRL', 0.063, true)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`delete from currency_map_converter where currencyCodeTo = 'BRL'`);
    }
}
