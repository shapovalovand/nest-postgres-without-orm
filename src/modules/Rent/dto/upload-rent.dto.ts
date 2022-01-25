import { IsNotEmpty, IsString } from 'class-validator';

export class UploadRentDto {
  /**
   * A date of start rent
   * @example '2021-12-30'
   */
  @IsNotEmpty()
  @IsString()
  start_date: string;

  /**
   * A date of end rent
   * @example '2022-01-04'
   */
  @IsNotEmpty()
  @IsString()
  end_date: string;
}
