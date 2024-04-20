import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from "class-validator";
import { Match } from "src/common/decorators/match.decorator";
import { Gender, UserType } from "../interfaces";
import { Type } from "class-transformer";

export class PlayerPositionDto {
  @IsString()
  name?: string;
}

export class RegisterUserDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: "Password is too weak!",
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @Match("password")
  confirmPassword: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsUUID()
  nationalityId: string;

  @IsOptional()
  @IsNumber()
  age: number;

  @IsOptional()
  @IsEnum(Gender)
  gender: Gender;

  @IsOptional()
  @IsEnum(UserType)
  userType: UserType;

  @IsOptional()
  @IsArray()
  ageRange: string;

  @IsOptional()
  avatar: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => PlayerPositionDto)
  playerPositions?: PlayerPositionDto[];
}
