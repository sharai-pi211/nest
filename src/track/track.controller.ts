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
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { validate as isUUID } from 'uuid';

@Controller('track')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  getAllTracks() {
    return this.trackService.getAllTracks();
  }

  @Get(':id')
  getTrackById(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new HttpException('Invalid trackId format', HttpStatus.BAD_REQUEST);
    }

    const track = this.trackService.getTrackById(id);
    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    return track;
  }

  @Post()
  @HttpCode(201)
  createTrack(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.createTrack(createTrackDto);
  }

  @Put(':id')
  @HttpCode(200)
  updateTrack(@Param('id') id: string, @Body() updateTrackDto: CreateTrackDto) {
    if (!isUUID(id)) {
      throw new HttpException('Invalid trackId format', HttpStatus.BAD_REQUEST);
    }

    const updatedTrack = this.trackService.updateTrack(id, updateTrackDto);
    if (!updatedTrack) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    return updatedTrack;
  }

  @Delete(':id')
  @HttpCode(204)
  deleteTrack(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new HttpException('Invalid trackId format', HttpStatus.BAD_REQUEST);
    }

    const isDeleted = this.trackService.deleteTrack(id);
    if (!isDeleted) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    return;
  }
}
