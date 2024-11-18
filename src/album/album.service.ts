import { Injectable } from '@nestjs/common';
import { albums, tracks } from '../database';
import { Album } from 'src/models/album.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AlbumService {
  getAllAlbums(): Album[] {
    return albums;
  }

  getAlbumById(id: string): Album | undefined {
    return albums.find((album) => album.id === id);
  }

  createAlbum(createAlbumDto): Album {
    const newAlbum: Album = {
      id: uuidv4(),
      ...createAlbumDto,
    };
    albums.push(newAlbum);
    return newAlbum;
  }

  updateAlbum(id: string, updateAlbumDto): Album | null {
    const album = this.getAlbumById(id);
    if (!album) return null;

    album.name = updateAlbumDto.name;
    album.year = updateAlbumDto.year;
    album.artistId = updateAlbumDto.artistId;
    return album;
  }

  deleteAlbum(id: string): boolean {
    const index = albums.findIndex((album) => album.id === id);
    if (index === -1) return false;

    albums.splice(index, 1);

    tracks.forEach((track, index) => {
      if (track.albumId === id) {
        tracks[index] = { ...track, albumId: null };
      }
    });

    return true;
  }
}
