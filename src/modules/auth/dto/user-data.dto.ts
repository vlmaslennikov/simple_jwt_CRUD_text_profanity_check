import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsLowercase,
  IsMongoId, IsNotEmpty,
  IsString
} from 'class-validator';

export class UserDataDto {
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsMongoId()
  id: string;

  @ApiProperty({ type: Number, required: true })
  @IsString()
  @IsEmail()
  @IsLowercase()
  email: string;
}
