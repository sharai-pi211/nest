import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddToFavoritesDto {
  @ApiProperty({
    description: 'UUID of the item to be added to favorites',
    example: 'f79c1d3a-7e62-41e7-97e5-2a6ff16c12e2',
  })
  @IsUUID('4', { message: 'Invalid UUID format' })
  id: string;
}
