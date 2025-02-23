import React, { useContext, useEffect } from 'react';
import qs from 'query-string';
import { useHistory, useLocation } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { VideosTable } from '../components/VideosTable';
import { VideosContext } from '../VideosContext';
import { useVideoActions } from '../hooks/useVideoActions';
import { VideoProcessed } from '../../common/interfaces';
import { VideosSearchForm } from '../components/VideosSearchForm';
import { useVideosToDisplay } from '../hooks/useVideosToDisplay';
import { useVideosOrder } from '../hooks/useVideosOrder';

export const VideosIndexRoute: React.FC = () => {
  const history = useHistory();
  const { videos, authors, reload } = useContext(VideosContext);

  // handle deleting video
  const { handleDelete } = useVideoActions();
  const onDelete = async (video: VideoProcessed) => {
    const result = await handleDelete(video, authors);
    if (result) {
      // reload the page after delete
      reload();
    }
  };

  // parsing location search parameters
  const { search } = useLocation();
  const { refresh, q } = qs.parse(search);

  // reload data hen url parameter `refresh` is set to true
  useEffect(() => {
    if (refresh === 'true') {
      reload();
      history.replace('/videos');
    }
  }, []); // eslint-disable-line

  // sort order for videos
  const { order, orderBy, onOrderChange } = useVideosOrder();

  // searching & ordering videos
  const videosToDisplay = useVideosToDisplay(videos, (q as string) || '', orderBy, order);

  return (
    <>
      <Typography variant="h3" component="h1" gutterBottom>
        Videos
      </Typography>
      <VideosSearchForm />
      <VideosTable videos={videosToDisplay} onDelete={onDelete} order={order} orderBy={orderBy} onOrderChange={onOrderChange} />
    </>
  );
};
