import React, { memo } from 'react';

import { DataGrid } from '@mui/x-data-grid';
import { CircularProgress, Typography } from '@mui/material';

import { columns } from '@containers/Home/home.config';
import { useDispatch, useSelector } from 'react-redux';
import { StoreDTO } from '@dtos/store.dtos';
import { LOAD_MORE_SONGS } from '@redux/constants';
import { CHILLAX_PATH, PLAYLIST_CHILLAX_PATH } from '@constants/routes.constants';
import styles from './styles.module.scss';

function Home(): JSX.Element {
  const dispatch = useDispatch();

  const stateSongs = useSelector((state: StoreDTO) => state.songsReducer);
  const isDataLoading = useSelector((state: StoreDTO) => state.loaderReducer?.isDataLoading);

  const fetchMorePosts = () => {
    if (stateSongs.lastKey > 0) {
      dispatch({ type: LOAD_MORE_SONGS });
    }
  };

  const handleScroll = (e) => {
    const element = e.target;
    if (Math.ceil(element.clientHeight + element.scrollTop) >= element.scrollHeight) {
      fetchMorePosts();
    }
  };

  return (
    <div className={styles.container} onScroll={handleScroll}>
      <Typography variant="h1" className={styles.title}>TOP Songs of 2022 - Billboard Hot 100 - Music Playlist
        2022
      </Typography>
      <Typography variant="body1" className={styles.details}>
        Top Tracks was selected based on Music Popularity over Youtube and Radios and also collecting data from
        Popular Charts. <a target="_blank" href={PLAYLIST_CHILLAX_PATH} rel="noreferrer">This Playlist</a> was
        took from channel: <a target="_blank" href={CHILLAX_PATH} rel="noreferrer">Chillax</a>
      </Typography>
      <div className={styles.tableWrap}>
        {stateSongs?.topSongs?.length > 0
          ? (
            <DataGrid
              rows={stateSongs?.topSongs || []}
              columns={columns}
              rowsPerPageOptions={[]}
              hideFooterPagination
              hideFooterSelectedRowCount
              hideFooter
              autoHeight
              disableColumnMenu
              disableColumnFilter
              disableColumnSelector
              className={styles.table}
            />
          )
          : <Typography variant="h4" textAlign="center" className={styles.noData}>No Data</Typography>}
        {isDataLoading && (
          <div className={styles.wrap}><CircularProgress /></div>
        ) }
      </div>
    </div>
  );
}

export default memo(Home);
