import { IsString, IsInt, IsUUID, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTrackDto {
  @ApiProperty({
    description: 'Name of the track',
    example: 'Bohemian Rhapsody',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'UUID of the artist (optional)',
    example: 'b8e79536-5e62-4f15-9e87-74e1b3fae1ec',
    nullable: true,
  })
  @IsUUID('4', { message: 'Invalid artistId format' })
  @IsOptional()
  artistId: string | null;

  @ApiProperty({
    description: 'UUID of the album (optional)',
    example: '1d7a967a-b8fc-46c9-8354-244fdd93a19f',
    nullable: true,
  })
  @IsUUID('4', { message: 'Invalid albumId format' })
  @IsOptional()
  albumId: string | null;

  @ApiProperty({
    description: 'Duration of the track in seconds',
    example: 354,
  })
  @IsInt()
  duration: number;
}
