import { Controller, Get, Query } from '@nestjs/common';
import { RentService } from './rent.service';

@Controller('rent')
export class RentController {
  constructor(private readonly rentService: RentService) {}

  @Get('getInit')
  async getInit(): Promise<any> {
    return await this.rentService.initEntity();
  }

  @Get('getAllRents')
  async getAllRents(): Promise<any> {
    return await this.rentService.getAllRents();
  }

  @Get('getDelete')
  async getDelete(): Promise<any> {
    return await this.rentService.deleteEntity();
  }

  @Get('getAvailable')
  async getAvailable(): Promise<any> {
    return await this.rentService.getAvailable(2);
  }

  @Get('getCost') // example /rent/getCost?start_date=2021-12-12&end_date=2021-12-28
  async getCost(@Query() query): Promise<any> {
    return await this.rentService.calculateCost(
      query.start_date,
      query.end_date,
      query.car_id,
    );
  }
}
