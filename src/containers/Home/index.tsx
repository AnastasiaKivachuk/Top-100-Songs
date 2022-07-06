import React, { memo } from 'react';

import { DataGrid } from '@mui/x-data-grid';
import { Button, CircularProgress, Typography } from '@mui/material';

import { columns } from '@containers/Home/home.config';
import { useDispatch, useSelector } from 'react-redux';
import { StoreDTO } from '@dtos/store.dtos';
import { LOAD_MORE_SONGS } from '@redux/constants';
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

  return (
    <div className={styles.container}>
      <Typography variant="h3" className={styles.title}>TOP 100 Songs of 2022 - Billboard Hot 100 - Music Playlist 2022
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
            />
          )
          : <Typography variant="h4" textAlign="center" className={styles.noData}>No Data</Typography>}
        {isDataLoading ? (
          <div className={styles.wrap}><CircularProgress /></div>
        ) : (stateSongs?.topSongs?.length > 0 && stateSongs?.lastKey > 0) ? (
          <div className={styles.wrap}>
            <Button variant="contained" onClick={fetchMorePosts}>
              More songs
            </Button>
          </div>
        ) : (
          <p className={styles.noData}>You are up to date!</p>
        )}
      </div>
    </div>
  );
}

export default memo(Home);
