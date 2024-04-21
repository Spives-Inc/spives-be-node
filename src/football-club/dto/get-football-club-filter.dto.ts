import { PaginationSearchOptionsDto } from '../../common/interfaces/pagination-search-options.dto';
import { Type } from 'class-transformer';
import {
  IsBooleanString,
  IsDate,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';

export enum FootballClubOrderColumns {
  CreatedAt = 'createdAt',
  Name = 'name',
}

export const MapFootballClubOrderByToValue = {
  createdAt: 'createdAt',
  name: 'name',
};

export class GetFootballClubFilterDto extends PaginationSearchOptionsDto {
  @IsOptional()
  @IsString()
  countryId?: string;

  @IsOptional()
  @IsBooleanString()
  status?: boolean;

  @IsEnum(FootballClubOrderColumns)
  @IsOptional()
  orderBy?: FootballClubOrderColumns;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  startDate?: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  endDate?: Date;
}