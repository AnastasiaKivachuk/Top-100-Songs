import * as React from 'react';

import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

import { getDateWithFormat } from '@helpers/functions.helpers';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { DATE_FORMAT } from '@constants/global.constants';
import { PATH_SONG, YOUTUBE_CHANEL_PATH, YOUTUBE_VIDEO_PATH } from '@constants/routes.constants';
import styles from '../home.module.scss';

export const columns: GridColDef[] = [
  {
    field: 'position',
    headerName: 'Position',
    headerAlign: 'center',
    sortable: false,
    minWidth: 90,
    align: 'center',
    valueGetter: (params: GridValueGetterParams) => params.row.snippet.position as number + 1,
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
    align: 'center',
    headerAlign: 'center',
    valueGetter: (params: GridValueGetterParams) => getDateWithFormat(params.row.snippet.publishedAt, DATE_FORMAT.DATE_WORD),
  },
  {
    field: 'channel',
    sortable: false,
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
    sortable: false,
    headerName: 'Thumbnail',
    align: 'center',
    headerAlign: 'center',
    renderCell: (params: GridValueGetterParams) => (
      <img
        src={params.row.snippet.thumbnails.default.url}
        width={params.row.snippet.thumbnails.default.width}
        height={params.row.snippet.thumbnails.default.height}
        className={styles.img}
        alt={params.row.snippet.title}
      />
    ),
    flex: 1.2,
    minWidth: 130,
  },
  {
    field: 'button',
    headerName: 'Actions',
    headerAlign: 'center',
    renderCell: (params: GridValueGetterParams) => (
      <Link href={PATH_SONG.replace('[id]', params.row.id)}>
        <Button variant="outlined" size="small" className={styles.button} data-testid="buttonDetail">
          Show Details
        </Button>
      </Link>
    ),
    width: 150,
    sortable: false,
    type: 'actions',
  },
];
