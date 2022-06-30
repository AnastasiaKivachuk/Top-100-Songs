import * as React from 'react';

import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

import { getDateWithFormat } from '@helpers/functions.helpers';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { DATE_FORMAT } from '@constants/global.constants';
import { PATH_SONG, YOUTUBE_CHANEL_PATH, YOUTUBE_VIDEO_PATH } from '@constants/routes.constants';

export const columns: GridColDef[] = [
  {
    field: 'position',
    headerName: 'Position',
    sortable: false,
    flex: 0.5,
    valueGetter: (params: GridValueGetterParams) => params.row.snippet.position + 1,
  },
  {
    field: 'title',
    headerName: 'Title',
    flex: 2.5,
    renderCell: (params: GridValueGetterParams) => (
      <a
        style={{ whiteSpace: 'normal' }}
        href={YOUTUBE_VIDEO_PATH.replace('[id]', params.row.contentDetails.videoId as string)}
        target="_blank"
        rel="noreferrer"
      >
        {params.row.snippet.title}
      </a>
    ),
  },
  {
    field: 'snippet.publishedAt',
    headerName: 'Published Date',
    flex: 1,
    valueGetter: (params: GridValueGetterParams) => getDateWithFormat(params.row.snippet.publishedAt, DATE_FORMAT.DATE_WORD),
  },
  {
    field: 'channel',
    headerName: 'Channel',
    renderCell: (params: GridValueGetterParams) => (
      <a href={YOUTUBE_CHANEL_PATH.replace('[id]', params.row.snippet.videoOwnerChannelId as string)} target="_blank" rel="noreferrer">
        {params.row.snippet.videoOwnerChannelTitle}
      </a>
    ),
    flex: 1.5,
  },
  {
    field: 'thumbnail',
    headerName: 'Thumbnail',
    renderCell: (params: GridValueGetterParams) => (
      <img
        src={params.row.snippet.thumbnails.default.url}
        width={params.row.snippet.thumbnails.default.width}
        height={params.row.snippet.thumbnails.default.height}
        alt={params.row.snippet.title}
      />
    ),
    flex: 1.2,
    minWidth: 130,
    align: 'center',
  },
  {
    field: 'button',
    headerName: '',
    renderCell: (params: GridValueGetterParams) => (
      <Link href={PATH_SONG.replace('[id]', params.row.id)}>
        <Button variant="outlined">
          Show Details
        </Button>
      </Link>
    ),
    width: 150,
    sortable: false,
    type: 'actions',
  },
];
