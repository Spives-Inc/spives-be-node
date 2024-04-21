import { PaginationSearchOptionsDto } from "../../common/interfaces/pagination-search-options.dto";
import { Type } from "class-transformer";
import {
  IsBooleanString,
  IsDate,
  IsEnum,
  IsOptional,
  IsString,
} from "class-validator";

export enum PlayerCardOrderColumns {
  CreatedAt = "createdAt",
  Name = "name",
}

export const MapPlayerCardOrderByToValue = {
  createdAt: "createdAt",
  name: "name",
};
export class GetPlayerCardFilterDto extends PaginationSearchOptionsDto {
  @IsOptional()
  @IsString()
  destination?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  price?: string;

  @IsOptional()
  @IsString()
  itinaryName?: string;

  @IsOptional()
  @IsBooleanString()
  status?: boolean;

  @IsEnum(PlayerCardOrderColumns)
  @IsOptional()
  orderBy?: PlayerCardOrderColumns;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  startDate?: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  endDate?: Date;
}
