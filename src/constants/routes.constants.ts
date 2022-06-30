export const PATH_INDEX = '/';
export const PATH_SIGN_IN = '/sign-in';
export const PATH_SIGN_UP = '/sign-up';
export const PATH_RESTORE_PASSWORD = '/restore-password';
export const PATH_FORGOT_PASSWORD = '/forgot-password';
export const PATH_SONGS = '/songs';
export const PATH_SONG = `${PATH_SONGS}/[id]`;

export const NON_AUTH_PATHS = [PATH_SIGN_IN, PATH_SIGN_UP, PATH_RESTORE_PASSWORD, PATH_FORGOT_PASSWORD];
export const PATHS_WITH_AUTH = [PATH_INDEX, PATH_SONG];

export const YOUTUBE_CHANEL_PATH = 'https://www.youtube.com/channel/[id]';
export const YOUTUBE_VIDEO_PATH = 'https://www.youtube.com/watch?v=[id]';
