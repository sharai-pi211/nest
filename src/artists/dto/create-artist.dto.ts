import { IsString, IsBoolean, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArtistDto {
  @ApiProperty({
    description: 'Name of the artist',
    example: 'Freddie Mercury',
  })
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Indicates if the artist has won a Grammy',
    example: true,
  })
  @IsBoolean({ message: 'Grammy must be a boolean value' })
  grammy: boolean;
}
