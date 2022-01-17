import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { ApiResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { RentService } from './rent.service';

@Controller('rent')
export class RentController {
  constructor(private readonly rentService: RentService) {}

  @Get('getInit')
  @ApiResponse({
    status: 201,
    description: 'The entity has been successfully created.',
  })
  @ApiNotFoundResponse({ status: 404, description: 'Not Found' })
  async getInit(): Promise<any> {
    return await this.rentService.initEntity();
  }

  @Get('getDelete')
  @ApiResponse({
    status: 201,
    description: 'The entity has been successfully deleted.',
  })
  @ApiNotFoundResponse({ status: 404, description: 'Not Found' })
  async getDelete(): Promise<any> {
    return await this.rentService.deleteEntity();
  }

  @Get('getAvailable')
  @ApiResponse({
    status: 201,
    description: 'The query has been successfully sended.',
  })
  @ApiNotFoundResponse({ status: 404, description: 'Not Found' })
  async getAvailable(): Promise<any> {
    return await this.rentService.getAvailable(2);
  }

  @Get('getAvgWorkload')
  @ApiResponse({
    status: 201,
    description: 'The query has been successfully sended.',
  })
  @ApiNotFoundResponse({ status: 404, description: 'Not Found' })
  async getAvgWorkload(): Promise<any> {
    return await this.rentService.avgWorkload();
  }

  @Get('getAvgAllWorkload')
  @ApiResponse({
    status: 201,
    description: 'The query has been successfully sended.',
  })
  @ApiNotFoundResponse({ status: 404, description: 'Not Found' })
  async getAvgAllWorkload(): Promise<any> {
    return await this.rentService.avgAllWorkload();
  }

  @Get('getCost') // example /rent/getCost?start_date=2021-12-12&end_date=2021-12-28
  @ApiResponse({
    status: 201,
    description: 'The query has been successfully sended.',
  })
  @ApiNotFoundResponse({ status: 404, description: 'Not Found' })
  async getCost(@Query() query): Promise<any> {
    if (!query.start_date || !query.end_date || !query.car_id)
      throw new BadRequestException();
    return await this.rentService.calculateCost(
      query.start_date,
      query.end_date,
      query.car_id,
    );
  }
}
