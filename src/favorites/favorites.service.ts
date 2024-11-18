import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { artists, albums, tracks, favorites } from '../database';
import { validate as isUUID } from 'uuid';

@Injectable()
export class FavoritesService {
  getAllFavorites() {
    return {
      artists: artists.filter((artist) =>
        favorites.artists.includes(artist.id),
      ),
      albums: albums.filter((album) => favorites.albums.includes(album.id)),
      tracks: tracks.filter((track) => favorites.tracks.includes(track.id)),
    };
  }

  addTrackToFavorites(trackId: string) {
    if (!isUUID(trackId)) {
      throw new HttpException('Invalid trackId format', HttpStatus.BAD_REQUEST);
    }

    const track = tracks.find((t) => t.id === trackId);
    if (!track) {
      throw new HttpException(
        'Track not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (!favorites.tracks.includes(trackId)) {
      favorites.tracks.push(trackId);
    }

    return { message: 'Track added to favorites' };
  }

  removeTrackFromFavorites(trackId: string) {
    if (!isUUID(trackId)) {
      throw new HttpException('Invalid trackId format', HttpStatus.BAD_REQUEST);
    }

    const index = favorites.tracks.indexOf(trackId);
    if (index === -1) {
      throw new HttpException(
        'Track not found in favorites',
        HttpStatus.NOT_FOUND,
      );
    }

    favorites.tracks.splice(index, 1);
  }

  addAlbumToFavorites(albumId: string) {
    if (!isUUID(albumId)) {
      throw new HttpException('Invalid albumId format', HttpStatus.BAD_REQUEST);
    }

    const album = albums.find((a) => a.id === albumId);
    if (!album) {
      throw new HttpException(
        'Album not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (!favorites.albums.includes(albumId)) {
      favorites.albums.push(albumId);
    }

    return { message: 'Album added to favorites' };
  }

  removeAlbumFromFavorites(albumId: string) {
    if (!isUUID(albumId)) {
      throw new HttpException('Invalid albumId format', HttpStatus.BAD_REQUEST);
    }

    const index = favorites.albums.indexOf(albumId);
    if (index === -1) {
      throw new HttpException(
        'Album not found in favorites',
        HttpStatus.NOT_FOUND,
      );
    }

    favorites.albums.splice(index, 1);
  }

  addArtistToFavorites(artistId: string) {
    if (!isUUID(artistId)) {
      throw new HttpException(
        'Invalid artistId format',
        HttpStatus.BAD_REQUEST,
      );
    }

    const artist = artists.find((a) => a.id === artistId);
    if (!artist) {
      throw new HttpException(
        'Artist not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (!favorites.artists.includes(artistId)) {
      favorites.artists.push(artistId);
    }

    return { message: 'Artist added to favorites' };
  }

  removeArtistFromFavorites(artistId: string) {
    if (!isUUID(artistId)) {
      throw new HttpException(
        'Invalid artistId format',
        HttpStatus.BAD_REQUEST,
      );
    }

    const index = favorites.artists.indexOf(artistId);
    if (index === -1) {
      throw new HttpException(
        'Artist not found in favorites',
        HttpStatus.NOT_FOUND,
      );
    }

    favorites.artists.splice(index, 1);
  }
}
