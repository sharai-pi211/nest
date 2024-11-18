import { User } from './models/user.interface';
import { Artist } from './models/artist.interface';
import { Album } from './models/album.interface';
import { Track } from './models/track.interface';
import { Favorites } from './models/favorites.interface';

export const users: User[] = [];
export const artists: Artist[] = [];
export const albums: Album[] = [];
export const tracks: Track[] = [];
export const favorites: Favorites = {
  artists: [],
  albums: [],
  tracks: [],
};
