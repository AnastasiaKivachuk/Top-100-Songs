import { DATE_FORMAT } from '@constants/global.constants';
import { getDateWithFormat } from '../functions.helpers';

describe('getDateWithFormat util', () => {
  it('Positive getDateWithFormat case with default props', () => {
    const date = '2014-01-06T18:06:00.000Z';
    const result = 'Jan 06, 2014';
    expect(getDateWithFormat(date)).toBe(result);
  });
  it('Positive getDateWithFormat case', () => {
    const date = '2014-01-06T18:06:00.000Z';
    const result = '06.01.2014, 21:06 PM';
    expect(getDateWithFormat(date, DATE_FORMAT.DATE_TIME_NUMBER)).toBe(result);
  });
  it('Negative getDateWithFormat case', () => {
    expect(getDateWithFormat('')).toBeNull();
  });
});
