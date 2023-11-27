import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateMedicateDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Kennel number should not be empty' })
  @IsString()
  dogUuid: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Description should not be empty' })
  @IsString()
  caretakerUuid: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty({ message: 'Intake date should not be empty' })
  @IsDateString({}, { message: 'Invalid date format for intake date' })
  actionDate?: Date;
}
