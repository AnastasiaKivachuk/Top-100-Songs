export enum DATE_FORMAT {
  DATE_TIME_NUMBER = 'DD/MM/YYYY, HH:mm A',
  DATE_NUMBER = 'DD/MM/YYYY',
  DATE_WORD = 'MMM DD, YYYY',
  DATE_DOTS = 'DD.MM.YYYY',
  COMPARED = 'YYYY.MM.DD',
  COMPARED_HOUR = 'YYYY.MM.DD HH',
}

export const TERMS_LINK = 'terms';
export const PRIVACY_POLICY_LINK = 'privacy-policy';

export enum SORT_DIRECTIONS {
  DESC = 'DESC',
  ASC = 'ASC',
}

export const CURRENCY = '$';
export const CRYPTO_CURRENCY = 'ETH';

export const PAGINATION_DEFAULT_TAKE = 10;

export const HTTP_CODE = {
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export const PURCHASE_STATUS = {
  ON_SALE: 'On sale',
  SOLD: 'Sold',
  CLOSED: 'Closed',
};

export const PURCHASE_TYPES = {
  AUCTION: 'Auction',
  FIX_PRICE: 'Fix price',
  FREE_NFT_EDITION: 'Free NFT',
};

export const PURCHASE_TYPES_VALUE = {
  AUCTION: 'AUCTION',
  FIX_PRICE: 'FIX_PRICE',
  FREE_NFT_EDITION: 'FREE_NFT_EDITION',
};

export const REFRESH_INTERVAL_ETH = 5 * 60 * 1000;

export const DURATION_OPTIONS = [{
  key: 1,
  value: '1440',
  text: '1 day',
}, {
  key: 2,
  value: '4320',
  text: '3 days',
}, {
  key: 3,
  value: '7200',
  text: '5 days',
}, {
  key: 4,
  value: '10080',
  text: '7 days',
}];

export const LOCAL_STORAGE_VARIABLE = { LAST_ROUTE: 'last_route' };

export const REG_NUMBER_WITH_2_DECIMAL_AFTER_DOT = /^\d+(\.\d{1,2})?$/;

export const SOCKET_EVENTS = {
  UPCOMING_COLLECTION_RELEASED: 'upcoming_collection_released',
  WITHDRAWAL_REQUEST: 'withdrawal_request',
  NFT_MINTED_SUCCESSFULLY: 'nft_minted_successfully',
  NFT_MINTING_FAILED: 'nft_minting_failed',
  UPCOMING_COLLECTION_DELETED: 'upcoming_collection_deleted',
};

export const REGULAR_2_DECIMAL_AND_LESS = /^(?:\d*\.\d{1,2}|\d+)$/;

export enum ECURRENCIES_ABBREVIATED_NAMES {
  SAVG = 'SAVG',
  WETH = 'wETH',
  SAVG_USD = 'SAVG USD',
  USDT = 'USDT',
  USDC = 'USDC',
  WMATIC = 'wMatic',
  ETH = 'ETH',
  EOS = 'EOS',
  WBTC = 'wBTC',
  MATIC = 'Matic',
}

export const DECIMALS_OTHER_TOKENS = 8;

export const DECIMALS_USD = 2;

export const DECIMALS_ETH = 4;

export const PURCHASE_LICENSE_TYPES_VALUES = {
  EXCLUSIVE: 'exclusive',
  CC_BY_NC_ND: 'CC_BY_NC_ND',
  CC_BY_NC: 'CC_BY_NC',
  CC_BY_ND: 'CC_BY_ND',
  CC_BY: 'CC_BY',
  CCO: 'CCO',
};

export const PURCHASE_LICENSE_TYPES_DEFINITION = {
  [PURCHASE_LICENSE_TYPES_VALUES.EXCLUSIVE]: 'Exclusive',
  [PURCHASE_LICENSE_TYPES_VALUES.CC_BY_NC_ND]: 'CC BY-NC-ND',
  [PURCHASE_LICENSE_TYPES_VALUES.CC_BY_NC]: 'CC BY-NC',
  [PURCHASE_LICENSE_TYPES_VALUES.CC_BY_ND]: 'CC BY-ND',
  [PURCHASE_LICENSE_TYPES_VALUES.CC_BY]: 'CC BY',
  [PURCHASE_LICENSE_TYPES_VALUES.CCO]: 'CCO',
};

export const LICENSE_TYPES_LIST = [
  {
    text: PURCHASE_LICENSE_TYPES_DEFINITION[PURCHASE_LICENSE_TYPES_VALUES.EXCLUSIVE],
    value: PURCHASE_LICENSE_TYPES_VALUES.EXCLUSIVE,
  },
  {
    text: PURCHASE_LICENSE_TYPES_DEFINITION[PURCHASE_LICENSE_TYPES_VALUES.CC_BY_NC_ND],
    value: PURCHASE_LICENSE_TYPES_VALUES.CC_BY_NC_ND,
  },
  {
    text: PURCHASE_LICENSE_TYPES_DEFINITION[PURCHASE_LICENSE_TYPES_VALUES.CC_BY_NC],
    value: PURCHASE_LICENSE_TYPES_VALUES.CC_BY_NC,
  },
  {
    text: PURCHASE_LICENSE_TYPES_DEFINITION[PURCHASE_LICENSE_TYPES_VALUES.CC_BY_ND],
    value: PURCHASE_LICENSE_TYPES_VALUES.CC_BY_ND,
  },
  {
    text: PURCHASE_LICENSE_TYPES_DEFINITION[PURCHASE_LICENSE_TYPES_VALUES.CC_BY],
    value: PURCHASE_LICENSE_TYPES_VALUES.CC_BY,
  },
  {
    text: PURCHASE_LICENSE_TYPES_DEFINITION[PURCHASE_LICENSE_TYPES_VALUES.CCO],
    value: PURCHASE_LICENSE_TYPES_VALUES.CCO,
  },
];

export const MAP_PURCHASE_LICENSE_TYPES = {
  [PURCHASE_LICENSE_TYPES_VALUES.EXCLUSIVE]: 'exclusive',
  [PURCHASE_LICENSE_TYPES_VALUES.EXCLUSIVE]: 'exclusive',
  [PURCHASE_LICENSE_TYPES_VALUES.CC_BY_NC_ND]: 'CC BY-NC-ND',
  [PURCHASE_LICENSE_TYPES_VALUES.CC_BY_NC]: 'CC BY-NC',
  [PURCHASE_LICENSE_TYPES_VALUES.CC_BY_ND]: 'CC BY-ND',
  [PURCHASE_LICENSE_TYPES_VALUES.CC_BY]: 'CC BY',
  [PURCHASE_LICENSE_TYPES_VALUES.CCO]: 'CCO',
};
export const MAX_COUNT_EMAILS = 10;

export const LICENSE_TYPES_LINKS = {
  [PURCHASE_LICENSE_TYPES_VALUES.EXCLUSIVE]: '/licenses/1. SAVAGE Exclusive Rights Management Agreement.pdf',
  [PURCHASE_LICENSE_TYPES_VALUES.CC_BY_NC_ND]: '/licenses/2. Credit to Creator, Noncommericlal, No adaptations.pdf',
  [PURCHASE_LICENSE_TYPES_VALUES.CC_BY_NC]: '/licenses/3. Credit to Creator, Noncommercial.pdf',
  [PURCHASE_LICENSE_TYPES_VALUES.CC_BY_ND]: '/licenses/4. Credit to Creator, No adaptations.pdf',
  [PURCHASE_LICENSE_TYPES_VALUES.CC_BY]: '/licenses/5. Credit to Creator.pdf',
  [PURCHASE_LICENSE_TYPES_VALUES.CCO]: '/licenses/6. Public Domain CC0.pdf',
};
