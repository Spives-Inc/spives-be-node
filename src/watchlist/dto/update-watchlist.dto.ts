import { IsOptional, IsString } from 'class-validator';

export class UpdateScoutWatchListDto {
  @IsOptional()
  @IsString()
  intention?: string;
}