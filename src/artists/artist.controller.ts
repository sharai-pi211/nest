import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
  HttpCode,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { validate as isUUID } from 'uuid';

@Controller('artist')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  getAllArtists() {
    return this.artistService.getAllArtists();
  }

  @Get(':id')
  getArtistById(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new HttpException(
        'Invalid artistId format',
        HttpStatus.BAD_REQUEST,
      );
    }

    const artist = this.artistService.getArtistById(id);
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    return artist;
  }

  @Post()
  @HttpCode(201)
  createArtist(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.createArtist(createArtistDto);
  }

  @Put(':id')
  @HttpCode(200)
  updateArtist(
    @Param('id') id: string,
    @Body() updateArtistDto: CreateArtistDto,
  ) {
    if (!isUUID(id)) {
      throw new HttpException(
        'Invalid artistId format',
        HttpStatus.BAD_REQUEST,
      );
    }

    const updatedArtist = this.artistService.updateArtist(id, updateArtistDto);
    if (!updatedArtist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    return updatedArtist;
  }

  @Delete(':id')
  @HttpCode(204)
  deleteArtist(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new HttpException(
        'Invalid artistId format',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isDeleted = this.artistService.deleteArtist(id);
    if (!isDeleted) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    return;
  }
}
