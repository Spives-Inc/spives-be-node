import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class UpdatePlayerCardDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  value?: string;

  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsBoolean()
  status?: boolean;

  @IsOptional()
  @IsString()
  updatedBy?: string;
}