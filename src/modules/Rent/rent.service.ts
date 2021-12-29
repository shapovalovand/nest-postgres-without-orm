import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../db/database.service';

@Injectable()
export class RentService {
  constructor(private readonly databaseService: DatabaseService) {}

  async initEntity() {
    return await this.databaseService.executeQuery(`
    CREATE TABLE RENT
    (ID SERIAL PRIMARY KEY    NOT NULL,
    CAR_ID             INT    NOT NULL,
    START_DATE         DATE   NOT NULL,
    END_DATE           DATE   NOT NULL)
    ;`);
  }

  async insertInto() {
    return await this.databaseService.executeQuery(`
    INSERT INTO RENT (CAR_ID, START_DATE, END_DATE) 
    VALUES (1, '01.01.01', '02.02.02')
    ;`);
  }

  async getAllRents() {
    return await this.databaseService.executeQuery(`
    SELECT * FROM RENT
    ;`);
  }

  async deleteEntity() {
    return await this.databaseService.executeQuery(`
    DROP TABLE RENT;
    `);
  }
}
