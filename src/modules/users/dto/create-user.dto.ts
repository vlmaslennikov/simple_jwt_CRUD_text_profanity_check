import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty, IsString, Length,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ type: String, required: true, description: 'length : from 1 to 15' })
  @IsString()
  @Length(1, 50)
  @IsNotEmpty()
  username: string;

  @ApiProperty({ type: String, minLength: 5, maxLength: 30, required: true, description: 'length : from 5 to 30' })
  @Length(5, 30)
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: String, minLength: 8, maxLength: 15, required: true, description: 'length : from 8 to 15' })
  @Length(5, 15)
  @IsString()
  @IsNotEmpty()
  password: string;
}
