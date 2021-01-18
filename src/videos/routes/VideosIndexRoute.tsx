import React, { useContext, useEffect } from 'react';
import qs from 'query-string';
import { useLocation, useHistory } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { VideosTable } from '../components/VideosTable';
import { VideosContext } from '../VideosContext';
import { useVideoActions } from '../hooks/useVideoActions';
import { VideoInput, VideoProcessed } from '../../common/interfaces';
import { VideosSearchForm } from '../components/VideosSearchForm';

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
  const { refresh } = qs.parse(search);
  useEffect(() => {
    if (refresh === 'true') {
      // reload data hen url parameter `refetch` is set to true
      reload();
      history.replace('/videos');
    }
  }, []); // eslint-disable-line

  return (
    <>
      <Typography variant="h3" component="h1" gutterBottom>
        Videos
      </Typography>
      <VideosSearchForm />
      <VideosTable videos={videos} onDelete={onDelete} />
    </>
  );
};
