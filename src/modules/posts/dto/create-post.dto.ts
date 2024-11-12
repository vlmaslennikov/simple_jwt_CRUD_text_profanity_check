import { ApiProperty } from '@nestjs/swagger';
import {
  IsMongoId,
  IsNotEmpty, IsString,
  Validate,
} from 'class-validator';
import { ProfanityValidator } from 'src/shared/validators/profanity.validator';

export class CreatePostDto {
  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  @Validate(ProfanityValidator)
  title: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  @Validate(ProfanityValidator)
  content: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsMongoId()
  @IsNotEmpty()
  userId: string;
}
