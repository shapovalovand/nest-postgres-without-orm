import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../db/database.service';

@Injectable()
export class RentService {
  constructor(private readonly databaseService: DatabaseService) {}

  async initEntity() {
    await this.databaseService.executeQuery(`
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
    return await this.databaseService.executeQuery(`
    INSERT INTO RENT (CAR_ID, START_DATE, END_DATE)
    VALUES (${car_id}, 
      (to_timestamp(${start_date.valueOf() / 1000.0})), 
      (to_timestamp(${end_date.valueOf() / 1000.0})))
    ;`);
  }

  async deleteEntity() {
    return await this.databaseService.executeQuery(`
    DROP TABLE RENT
    ;`);
  }

  async workload_query() {
    return await this.databaseService.executeQuery(`
    SELECT * FROM RENT
    WHERE (NOW() - INTERVAL '30 DAY') < END_DATE
    ;`);
  }

  async avg_workload() {
    const workload = await this.workload_query();
    const res = new Map();
    workload.forEach((_elem) => {
      if (!res.has(_elem['car_id'])) {
        res.set(_elem['car_id'], 0);
      }

      const end_date =
        new Date() < _elem['end_date'] ? new Date() : _elem['end_date'];
      const priorDate = new Date();
      priorDate.setDate(priorDate.getDate() - 30);
      const start_date =
        priorDate > _elem['start_date'] ? priorDate : _elem['start_date'];
      res.set(
        _elem['car_id'],
        res.get(_elem['car_id']) +
          (end_date - start_date) / (1000 * 3600 * 24 * 30),
      );
    });
    return Object.fromEntries(res);
  }

  async avg_all_workload() {
    const avg: object = await this.avg_workload();
    return (
      Object.values(avg).reduce((prev, cur) => {
        return prev + cur;
      }) / Object.keys(avg).length
    );
  }

  async getAvailable(car_id: number) {
    const date = new Date(new Date().toLocaleDateString());
    date.setDate(date.getDate() - 3);
    return await this.databaseService.executeQuery(`
    SELECT CAR_ID, END_DATE FROM
    (SELECT CAR_ID, END_DATE FROM RENT 
    WHERE CAR_ID = ${car_id}
    ORDER BY END_DATE DESC
    LIMIT 1
    ) AS LATEST_DATE
    WHERE END_DATE < (to_timestamp(${date.valueOf() / 1000.0}));`);
  }

  async calculateCost(start: string, end: string, car_id: string) {
    const car = car_id as unknown as number;
    const isAvailable = await this.getAvailable(car);
    if (!isAvailable.length) return null;

    const start_date = new Date(start);
    const end_date = new Date(end);
    if (
      start_date.getDay() < 1 ||
      start_date.getDay() > 5 ||
      end_date.getDay() < 1 ||
      end_date.getDay() > 5
    )
      return null;

    start_date.setDate(start_date.getDate());
    start_date.setHours(12, 0, 0);
    end_date.setDate(end_date.getDate());
    end_date.setHours(12, 0, 0);

    let days = (end_date.valueOf() - start_date.valueOf()) / 8.64e7;
    let cost = 0;
    if (days > 29 || days <= 0) return null;
    if (days > 17) {
      cost += (days - 17) * (1000 - 1000 * 0.15);
      days -= days - 17;
    }
    if (days > 9) {
      cost += (days - 9) * (1000 - 1000 * 0.1);
      days -= days - 9;
    }
    if (days > 4) {
      cost += (days - 4) * (1000 - 1000 * 0.05);
      days -= days - 4;
    }
    if (days > 4) {
      cost += (days - 4) * (1000 - 1000 * 0.05);
      days -= days - 4;
    }

    this.insertInto(car, start_date, end_date);

    return cost + days * 1000;
  }
}
