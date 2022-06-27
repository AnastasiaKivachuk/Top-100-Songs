export const MIN_PASSWORD_LENGTH = 8;

export const MAX_PASSWORD_LENGTH = 64;

export const PASSWORD_REGEXP = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_\-+=])[A-Za-z\d!@#$%^&*_\-+=]/;

export const LATIN_SYMBOL_REGEXP = /^[a-zA-Z\s0-9]+$/g;

export const LATIN_SYMBOL_AND_CHARACTERS_REGEXP = /^[a-zA-Z\s0-9-!$%^&*()_+|~=`{}\\[\]:";'<>?,.\\/]+$/g;

export const VERIFY_AUTH_NONCE_TYPES = {
  INVITE: 'invite',
  RESTORE_PASSWORD: 'restore-password',
};
