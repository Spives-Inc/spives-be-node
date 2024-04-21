import { PaginationSearchOptionsDto } from '../../common/interfaces/pagination-search-options.dto';
import { Type } from 'class-transformer';
import {
  IsBooleanString,
  IsDate,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';

export enum WatchListOrderColumns {
  CreatedAt = 'createdAt',
  Name = 'name',
}

export const MapWatchListOrderByToValue = {
  createdAt: 'createdAt',
  name: 'name',
};

export class GetWatchListFilterDto extends PaginationSearchOptionsDto {
  @IsOptional()
  @IsBooleanString()
  status?: boolean;

  @IsEnum(WatchListOrderColumns)
  @IsOptional()
  orderBy?: WatchListOrderColumns;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  startDate?: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  endDate?: Date;
}