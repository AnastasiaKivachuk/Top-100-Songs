import { UserDTO } from '@interfaces/user.interfaces';

export interface SongDTO {
  'kind': string,
  'etag': string,
  'id': string,
  'snippet': {
    'publishedAt': string,
    'channelId': string,
    'title': string,
    'description': string,
    'thumbnails': {
      'default': {
        'url': string,
        'width': number,
        'height': number
      },
      'medium': {
        'url': string,
        'width': number,
        'height': number
      },
      'high': {
        'url': string,
        'width': number,
        'height': number
      }
    },
    'channelTitle': string,
    'playlistId': string,
    'position': number,
    'resourceId': {
      'kind': string,
      'videoId': string
    },
    'videoOwnerChannelTitle': string,
    'videoOwnerChannelId': string
  },
  'contentDetails': {
    'videoId': string,
    'videoPublishedAt': string
  }
}

export interface StoreDTO {
  user: {user: UserDTO, isLoading: boolean},
  songs: {topSongs: SongDTO[], lastKey: number, error: string, isLoading: boolean, isInitLoading: boolean },
}
