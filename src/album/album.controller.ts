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
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { validate as isUUID } from 'uuid';

@Controller('album')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  getAllAlbums() {
    return this.albumService.getAllAlbums();
  }

  @Get(':id')
  getAlbumById(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new HttpException('Invalid albumId format', HttpStatus.BAD_REQUEST);
    }

    const album = this.albumService.getAlbumById(id);
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    return album;
  }

  @Post()
  @HttpCode(201)
  createAlbum(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.createAlbum(createAlbumDto);
  }

  @Put(':id')
  @HttpCode(200)
  updateAlbum(@Param('id') id: string, @Body() updateAlbumDto: CreateAlbumDto) {
    if (!isUUID(id)) {
      throw new HttpException('Invalid albumId format', HttpStatus.BAD_REQUEST);
    }

    const updatedAlbum = this.albumService.updateAlbum(id, updateAlbumDto);
    if (!updatedAlbum) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    return updatedAlbum;
  }

  @Delete(':id')
  @HttpCode(204)
  deleteAlbum(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new HttpException('Invalid albumId format', HttpStatus.BAD_REQUEST);
    }

    const isDeleted = this.albumService.deleteAlbum(id);
    if (!isDeleted) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    return;
  }
}
