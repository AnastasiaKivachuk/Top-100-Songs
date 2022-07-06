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
  userReducer: {user: UserDTO},
  songsReducer: {topSongs: SongDTO[], lastKey: number},
  errorsReducer: {error: string},
  loaderReducer: {isDataLoading: boolean},
}
