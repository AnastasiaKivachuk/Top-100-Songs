import React, {
  memo, useEffect, useMemo, useState,
} from 'react';
import { useRouter } from 'next/router';
import ReactPlayer from 'react-player/youtube';
import { useSelector } from 'react-redux';

import { CircularProgress, Typography } from '@mui/material';

import { SongDTO, StoreDTO } from '@dtos/store.dtos';
import { getDetails } from '@services/songs.service';
import { YOUTUBE_CHANEL_PATH, YOUTUBE_VIDEO_PATH } from '@constants/routes.constants';
import { getDateWithFormat } from '@helpers/functions.helpers';
import { DATE_FORMAT } from '@constants/global.constants';
import styles from './styles.module.scss';

function Details(): JSX.Element {
  const { query } = useRouter();
  const [details, setDetails] = useState<null | SongDTO>(null);
  const [loading, setLoading] = useState(false);
  const topSongs = useSelector((state: StoreDTO) => state.songsReducer?.topSongs);

  useEffect(() => {
    const detailsFromStore = topSongs?.find((item) => item.id === query.id);

    if (detailsFromStore) {
      return setDetails(detailsFromStore);
    }
    (async () => {
      setLoading(true);
      const res = await getDetails(query.id);
      setLoading(false);
      setDetails(res as SongDTO);
    })();

  }, []);

  const description = useMemo(() => {
    if (details) {
      return details.snippet.description.split('\n');
    }
  }, [details]);

  return (
    <div className={styles.container}>
      {loading ? <div className={styles.wrapLoader}><CircularProgress /></div> : details ? (
        <div>
          <Typography
            variant="h3"
            className={styles.title}
          >{details.snippet.position + 1}. {details.snippet.title}
          </Typography>
          <ReactPlayer
            url={YOUTUBE_VIDEO_PATH.replace('[id]', details.contentDetails.videoId)}
            className={styles.video}
          />
          <div>
            <a
              href={YOUTUBE_CHANEL_PATH.replace('[id]', details.snippet.videoOwnerChannelId)}
              target="_blank"
              rel="noreferrer"
            >Video Owner: {details.snippet.videoOwnerChannelTitle}
            </a>
            <div>Published At: {getDateWithFormat(details.snippet.publishedAt, DATE_FORMAT.DATE_TIME_NUMBER)}</div>
          </div>

          <Typography
            variant="h6"
          >Description
          </Typography>
          {description.map((item, i) => (
            <Typography
              variant="body1"
              key={`${item.slice(0, 5)}${i}`}
            >{item}
            </Typography>
          ))}

        </div>
      ) : <div>Something went wrong</div>}
    </div>
  );
}

export default memo(Details);
