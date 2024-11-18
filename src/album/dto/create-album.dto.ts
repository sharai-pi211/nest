import { IsString, IsInt, IsUUID, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAlbumDto {
  @ApiProperty({
    description: 'Name of the album',
    example: 'Innuendo',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Release year of the album',
    example: 1991,
  })
  @IsInt()
  year: number;

  @ApiProperty({
    description: 'UUID of the artist (optional)',
    example: 'b3bfc9d7-e5bb-4d3a-8e5a-0f8ff4e9b6f7',
    nullable: true,
  })
  @IsUUID('4', { message: 'Invalid artistId format' })
  @IsOptional()
  artistId: string | null;
}
