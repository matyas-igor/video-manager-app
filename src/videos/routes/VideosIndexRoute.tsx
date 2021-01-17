import React, { useContext, useEffect } from 'react';
import qs from 'query-string';
import { useLocation, useHistory } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { VideosTable } from '../components/VideosTable';
import { VideosContext } from '../VideosContext';

export const VideosIndexRoute: React.FC = () => {
  const history = useHistory();
  const { videos, reload } = useContext(VideosContext);
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
      <VideosTable videos={videos} />
    </>
  );
};
