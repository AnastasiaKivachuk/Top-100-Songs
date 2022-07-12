import React, { memo, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import ReactPlayer from 'react-player/youtube';
import { useSelector } from 'react-redux';

import { CircularProgress, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { SongDTO, StoreDTO } from '@redux/interfaces/store.interface';
import { getDetails } from '@services/songs.service';
import { YOUTUBE_CHANEL_PATH, YOUTUBE_VIDEO_PATH } from '@constants/routes.constants';
import { getArrayText, getDateWithFormat, trimmedString } from '@helpers/functions.helpers';
import { DATE_FORMAT, MAX_LENGTH_TEXT } from '@constants/global.constants';
import styles from './styles.module.scss';

function Details(): JSX.Element {
  const router = useRouter();
  const { query } = useRouter();
  const [isShowFullDescription, setFullDescription] = useState(false);
  const [details, setDetails] = useState<null | SongDTO>(null);
  const [loading, setLoading] = useState(false);
  const topSongs = useSelector((state: StoreDTO) => state.songs?.topSongs);

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

  const trimmedDescription = useMemo(() => trimmedString(details?.snippet?.description), [details]);

  const renderText = useMemo(
    () => (
      getArrayText(isShowFullDescription ? details?.snippet?.description : trimmedDescription)),
    [isShowFullDescription, details],
  );

  return (
    <div className={styles.container}>
      <div className={styles.back} onClick={() => router.back()} role="presentation"><ArrowBackIcon /> Back</div>
      {loading ? <div className={styles.wrapLoader}><CircularProgress /></div> : details ? (
        <div>
          <Typography
            variant="h1"
            className={styles.title}
          >{details.snippet.position + 1}. {details.snippet.title}
          </Typography>
          <div className={styles.mainInfoWrap}>
            <div>
              Video Owner:
              <a
                href={YOUTUBE_CHANEL_PATH.replace('[id]', details.snippet.videoOwnerChannelId)}
                target="_blank"
                rel="noreferrer"
              > {details.snippet.videoOwnerChannelTitle}
              </a>
            </div>
            <div>Published
              At: {getDateWithFormat(details.snippet.publishedAt, DATE_FORMAT.DATE_TIME_NUMBER)}
            </div>
          </div>
          <ReactPlayer
            url={YOUTUBE_VIDEO_PATH.replace('[id]', details.contentDetails.videoId)}
            className={styles.video}
          />

          <Typography
            variant="body1"
            className={styles.description}
          >Description
          </Typography>
          <div data-testid="description">
            {renderText.map((item: string, i: number) => (
              <Typography
                variant="body1"
                className={styles.descriptionData}
                key={`${item.slice(0, 5)}${i}`}
              >{item}
              </Typography>
            ))}
            {details?.snippet?.description?.length > MAX_LENGTH_TEXT
                && (
                  <span
                    role="presentation"
                    className={styles.link}
                    onClick={() => setFullDescription((prevState) => !prevState)}
                    data-testid="btn"
                  >
                    {isShowFullDescription ? 'Show less' : 'Read more'}
                  </span>
                )}
          </div>
        </div>
      ) : <div className={styles.error}>Something went wrong</div>}
    </div>
  );
}

export default memo(Details);
