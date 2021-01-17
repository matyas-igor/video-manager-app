import React, { useContext, useEffect, useState } from 'react';
import { Container, TableContainer } from '@material-ui/core';
import { VideosTable } from '../components/VideosTable';
import { ProcessedVideo } from '../../common/interfaces';
import { getVideos } from '../services/videos';
import { VideosContext } from '../VideosContext';

export const VideosIndexRoute: React.FC = () => {
  const { videos } = useContext(VideosContext);
  return <VideosTable videos={videos} />;
};
