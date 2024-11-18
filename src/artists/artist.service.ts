import { Injectable } from '@nestjs/common';
import { albums, tracks, artists } from '../database';
import { Artist } from 'src/models/artist.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ArtistService {
  getAllArtists(): Artist[] {
    return artists;
  }

  getArtistById(id: string): Artist | undefined {
    return artists.find((artist) => artist.id === id);
  }

  createArtist(createArtistDto): Artist {
    const newArtist: Artist = {
      id: uuidv4(),
      ...createArtistDto,
    };
    artists.push(newArtist);
    return newArtist;
  }

  updateArtist(id: string, updateArtistDto): Artist | null {
    const artist = this.getArtistById(id);
    if (!artist) return null;

    artist.name = updateArtistDto.name;
    artist.grammy = updateArtistDto.grammy;
    return artist;
  }

  deleteArtist(id: string): boolean {
    const index = artists.findIndex((artist) => artist.id === id);
    if (index === -1) return false;

    artists.splice(index, 1);

    tracks.forEach((track, index) => {
      if (track.artistId === id) {
        tracks[index] = { ...track, artistId: null };
      }
    });

    albums.forEach((album, index) => {
      if (album.artistId === id) {
        albums[index] = { ...album, artistId: null };
      }
    });

    return true;
  }
}
