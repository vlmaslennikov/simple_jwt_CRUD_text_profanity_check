import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail, IsLowercase, IsOptional, IsString, Length,
} from 'class-validator';

export class SignInDto {
  @IsString()
  @IsEmail()
  @IsLowercase()
  @ApiProperty({ type: Number, required: true })
  email: string;

  @IsString()
  @Length(5, 15)
  @IsOptional()
  @ApiProperty({ type: Number, required: true })
  password: string;
}
