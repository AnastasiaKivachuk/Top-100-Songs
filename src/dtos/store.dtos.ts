import { UserDTO } from '@dtos/user.dtos';

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
  user: {user: UserDTO},
  songs: {topSongs: SongDTO[], lastKey: number},
  errors: {error: string},
  loader: {isDataLoading: boolean},
}
