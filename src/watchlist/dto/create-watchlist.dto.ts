import { IsString, IsOptional, IsUUID } from 'class-validator';

export class CreateScoutWatchListDto {
  @IsUUID()
  @IsString()
  talentId: string;

  @IsOptional()
  @IsString()
  intention?: string;
}