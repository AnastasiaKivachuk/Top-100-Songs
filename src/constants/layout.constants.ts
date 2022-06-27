import {
  PATH_ADMIN,
  PATH_ADMINS,
  PATH_CARBON_OFFSET,
  PATH_CATEGORIES,
  PATH_COLLECTIONS,
  PATH_INDEX,
  PATH_MEMBERS,
  PATH_USERS,
  PATH_WITHDRAWAL_REQUESTS,
} from './routes.constants';

export const PAGE_TITLES_BY_PATHNAME = {
  [PATH_INDEX]: 'Home Page',
  [PATH_ADMINS]: 'Users & Admins',
  [PATH_MEMBERS]: 'Users & Admins',
  [PATH_USERS]: 'Users & Admins',
  [PATH_CATEGORIES]: 'Categories',
  [PATH_CARBON_OFFSET]: 'Carbon offset',
  [PATH_COLLECTIONS]: 'Collections & NFTs',
  [PATH_WITHDRAWAL_REQUESTS]: 'Withdrawal requests',
};

export const PAGE_LINKS_BY_PATHNAME = {
  [PATH_ADMIN]: {
    url: PATH_ADMINS,
    text: 'Back Admin’s list',
  },
};

export const PAGES_WITHOUT_CONTENT_WRAP = [PATH_ADMIN, PATH_COLLECTIONS];
