const API_PATH = 'api';

export const API_AUTH_SIGN_IN = `${API_PATH}/auth/sign-in`;
export const API_AUTH_SIGN_OUT = `${API_PATH}/auth/sign-out`;
export const API_AUTH_GET_ME = `${API_PATH}/auth/me`;

export const API_NON_AUTH_PATHS = [API_AUTH_GET_ME, API_AUTH_SIGN_IN].map((path) => `${API_PATH}${path}`);
