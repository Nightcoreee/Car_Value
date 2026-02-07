/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class InitialSchema1770488328990 {
    name = 'InitialSchema1770488328990'

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "report_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "approved" boolean NOT NULL DEFAULT (0), "price" integer NOT NULL, "make" varchar NOT NULL, "model" varchar NOT NULL, "year" integer NOT NULL, "lng" integer NOT NULL, "lat" integer NOT NULL, "mileage" integer NOT NULL, "userId" integer)`);
        await queryRunner.query(`CREATE TABLE "user_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "admin" boolean NOT NULL DEFAULT (1))`);
        await queryRunner.query(`CREATE TABLE "temporary_report_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "approved" boolean NOT NULL DEFAULT (0), "price" integer NOT NULL, "make" varchar NOT NULL, "model" varchar NOT NULL, "year" integer NOT NULL, "lng" integer NOT NULL, "lat" integer NOT NULL, "mileage" integer NOT NULL, "userId" integer, CONSTRAINT "FK_8f2828e57b5484726488f72ad58" FOREIGN KEY ("userId") REFERENCES "user_entity" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_report_entity"("id", "approved", "price", "make", "model", "year", "lng", "lat", "mileage", "userId") SELECT "id", "approved", "price", "make", "model", "year", "lng", "lat", "mileage", "userId" FROM "report_entity"`);
        await queryRunner.query(`DROP TABLE "report_entity"`);
        await queryRunner.query(`ALTER TABLE "temporary_report_entity" RENAME TO "report_entity"`);
    }

    /**
     * @param {QueryRunner} queryRunner
     */
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "report_entity" RENAME TO "temporary_report_entity"`);
        await queryRunner.query(`CREATE TABLE "report_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "approved" boolean NOT NULL DEFAULT (0), "price" integer NOT NULL, "make" varchar NOT NULL, "model" varchar NOT NULL, "year" integer NOT NULL, "lng" integer NOT NULL, "lat" integer NOT NULL, "mileage" integer NOT NULL, "userId" integer)`);
        await queryRunner.query(`INSERT INTO "report_entity"("id", "approved", "price", "make", "model", "year", "lng", "lat", "mileage", "userId") SELECT "id", "approved", "price", "make", "model", "year", "lng", "lat", "mileage", "userId" FROM "temporary_report_entity"`);
        await queryRunner.query(`DROP TABLE "temporary_report_entity"`);
        await queryRunner.query(`DROP TABLE "user_entity"`);
        await queryRunner.query(`DROP TABLE "report_entity"`);
    }
}
