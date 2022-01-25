import { IsNotEmpty, IsNumber, IsDate } from 'class-validator';

export class CreateRentDto {
  /**
   * A car's number
   * @example 2
   */
  @IsNotEmpty()
  @IsNumber()
  car_id: number;

  /**
   * A date of start rent
   * @example '2021-12-30'
   */
  @IsNotEmpty()
  @IsDate()
  start_date: Date;

  /**
   * A date of end rent
   * @example '2022-01-04'
   */
  @IsNotEmpty()
  @IsDate()
  end_date: Date;
}
