// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react';
import Link from 'next/link';

import Button from '@mui/material/Button';

import { mockTopSongsStore } from '@containers/Home/mockStore';
import { columns } from '@containers/Home/home.config';
import { PATH_SONG, YOUTUBE_CHANEL_PATH, YOUTUBE_VIDEO_PATH } from '@constants/routes.constants';
import { getDateWithFormat } from '@helpers/functions.helpers';
import { DATE_FORMAT } from '@constants/global.constants';

describe('check homeColumns config', () => {
  it('check position usersColumns config', () => {
    const position = columns[0];
    if (position?.valueGetter) {
      expect(position.valueGetter({ row: mockTopSongsStore[0] })).toBe(mockTopSongsStore[0].snippet.position + 1);
    }
  });

  it('check title homeColumns config', () => {
    const title = columns[1];
    if (title?.renderCell) {
      expect(title.renderCell({ row: mockTopSongsStore[0] })).toEqual(
        <a
          style={{ whiteSpace: 'normal' }}
          href={YOUTUBE_VIDEO_PATH.replace('[id]', mockTopSongsStore[0].contentDetails.videoId)}
          target="_blank"
          rel="noreferrer"
        >
          {mockTopSongsStore[0].snippet.title}
        </a>,
      );
    }
  });

  it('check publishedAt homeColumns config', () => {
    const publishedAt = columns[2];
    if (publishedAt?.valueGetter) {
      expect(publishedAt.valueGetter({ row: mockTopSongsStore[0] }))
        .toBe(getDateWithFormat(mockTopSongsStore[0].snippet.publishedAt, DATE_FORMAT.DATE_WORD));
    }
  });

  it('check channel homeColumns config', () => {
    const channel = columns[3];
    if (channel?.renderCell) {
      expect(channel.renderCell({ row: mockTopSongsStore[0] })).toEqual(
        <a href={YOUTUBE_CHANEL_PATH.replace('[id]', mockTopSongsStore[0].snippet.videoOwnerChannelId)} target="_blank" rel="noreferrer">
          {mockTopSongsStore[0].snippet.videoOwnerChannelTitle}
        </a>,
      );
    }
  });

  it('check thumbnail homeColumns config', () => {
    const thumbnail = columns[4];
    if (thumbnail?.renderCell) {
      expect(thumbnail.renderCell({ row: mockTopSongsStore[0] })).toEqual(
        <img
          src={mockTopSongsStore[0].snippet.thumbnails.default.url}
          width={mockTopSongsStore[0].snippet.thumbnails.default.width}
          height={mockTopSongsStore[0].snippet.thumbnails.default.height}
          alt={mockTopSongsStore[0].snippet.title}
        />,
      );
    }
  });

  it('check button homeColumns config', () => {
    const button = columns[5];
    if (button?.renderCell) {
      expect(button.renderCell({ row: mockTopSongsStore[0] })).toEqual(
        <Link href={PATH_SONG.replace('[id]', mockTopSongsStore[0].id)}>
          <Button variant="outlined">
            Show Details
          </Button>
        </Link>,
      );
    }
  });
});
