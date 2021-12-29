import { Controller, Get } from '@nestjs/common';
import { RentService } from './rent.service';

@Controller('rent')
export class RentController {
  constructor(private readonly rentService: RentService) {}

  @Get('getInit')
  async getInit(): Promise<any> {
    return await this.rentService.initEntity();
  }

  @Get('getInsert')
  async getInsert(): Promise<any> {
    return await this.rentService.insertInto();
  }

  @Get('getAllRents')
  async getAllRents(): Promise<any> {
    return await this.rentService.getAllRents();
  }

  @Get('getDelete')
  async getDelete(): Promise<any> {
    return await this.rentService.deleteEntity();
  }
}
