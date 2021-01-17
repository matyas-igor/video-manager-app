import React, { useContext } from 'react';
import { Typography } from '@material-ui/core';
import { VideosTable } from '../components/VideosTable';
import { VideosContext } from '../VideosContext';

export const VideosIndexRoute: React.FC = () => {
  const { videos } = useContext(VideosContext);
  return (
    <>
      <Typography variant="h3" component="h1" gutterBottom>
        Videos
      </Typography>
      <VideosTable videos={videos} />
    </>
  );
};
