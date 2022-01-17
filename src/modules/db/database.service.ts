import { Inject, Injectable, Logger } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class DatabaseService {
  private readonly logger = new Logger(DatabaseService.name);

  constructor(@Inject('DATABASE_POOL') private pool: Pool) {}

  private async executeQuery(
    queryText: string,
    values: any[] = [],
  ): Promise<any[]> {
    this.logger.debug(`Executing query: ${queryText} (${values})`);
    const result = await this.pool.query(queryText, values);
    this.logger.debug(`Executed query, result size ${result.rows.length}`);
    return result.rows;
  }

  async initEntity() {
    await this.executeQuery(`
    CREATE TABLE RENT
    (ID SERIAL PRIMARY KEY    NOT NULL,
    CAR_ID             INT    NOT NULL,
    START_DATE         DATE   NOT NULL,
    END_DATE           DATE   NOT NULL)
    ;`);

    this.insertInto(1, new Date(1), new Date(25 * 3600 * 1000));
    this.insertInto(2, new Date(1), new Date(25 * 3600 * 1000));
    this.insertInto(3, new Date(1), new Date(25 * 3600 * 1000));
    this.insertInto(4, new Date(1), new Date(25 * 3600 * 1000));
    this.insertInto(5, new Date(1), new Date(25 * 3600 * 1000));

    this.insertInto(5, new Date('Dec 26, 2021'), new Date(2022, 0, 15));
    this.insertInto(3, new Date('Dec 1, 2021'), new Date('Dec 8, 2021'));
    this.insertInto(3, new Date('Dec 10, 2021'), new Date('Dec 17, 2021'));
    this.insertInto(3, new Date('Dec 20, 2021'), new Date('Dec 30, 2021'));
    this.insertInto(4, new Date('Dec 7, 2021'), new Date(2022, 0, 15));

    return true;
  }

  async insertInto(car_id: number, start_date: Date, end_date: Date) {
    return await this.executeQuery(`
    INSERT INTO RENT (CAR_ID, START_DATE, END_DATE)
    VALUES (${car_id}, 
      (to_timestamp(${start_date.valueOf() / 1000.0})), 
      (to_timestamp(${end_date.valueOf() / 1000.0})))
    ;`);
  }

  async deleteEntity() {
    return await this.executeQuery(`
    DROP TABLE RENT
    ;`);
  }

  async workload_query() {
    return await this.executeQuery(`
    SELECT * FROM RENT
    WHERE (NOW() - INTERVAL '30 DAY') < END_DATE
    ;`);
  }

  async getAvailable(car_id: number) {
    const date = new Date(new Date().toLocaleDateString());
    date.setDate(date.getDate() - 3);
    return await this.executeQuery(`
    SELECT CAR_ID, END_DATE FROM
    (SELECT CAR_ID, END_DATE FROM RENT 
    WHERE CAR_ID = ${car_id}
    ORDER BY END_DATE DESC
    LIMIT 1
    ) AS LATEST_DATE
    WHERE END_DATE < (to_timestamp(${date.valueOf() / 1000.0}));`);
  }
}
