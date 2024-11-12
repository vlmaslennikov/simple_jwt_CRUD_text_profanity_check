import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean, IsNotEmpty,
} from 'class-validator';
import { UserDataDto } from './user-data.dto';

export class CreateTokensDto {
  @ApiProperty({ type: UserDataDto, required: true })
  @IsNotEmpty()
  payload: UserDataDto;

  @ApiProperty({ type: Boolean, required: true })
  @IsBoolean()
  @IsNotEmpty()
  createAccess: boolean;

  @ApiProperty({ type: Boolean, required: true })
  @IsBoolean()
  @IsNotEmpty()
  createRefresh: boolean;
}
