import moment from 'moment';

import { DATE_FORMAT, MAX_LENGTH_TEXT } from '@constants/global.constants';

export const getDateWithFormat = (data: Date | string, format = DATE_FORMAT.DATE_WORD): string | null => (
  data ? moment(data)
    .format(format) : null);

export const trimmedString = (text: string, maxLength = MAX_LENGTH_TEXT): string => (
  text?.length > maxLength ? `${text?.substring(0, maxLength)}...` : text);

export const getArrayText = (string) => string?.split('\n');
