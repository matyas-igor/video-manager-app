import React, { useContext } from 'react';
import { Typography } from '@material-ui/core';
import { Redirect, useParams, useRouteMatch } from 'react-router-dom';
import { Breadcrumbs } from '../../common/components/Breadcrumbs';
import { VideosContext } from '../VideosContext';
import { VideoForm } from '../components/VideoForm';
import { VideoInput } from '../../common/interfaces';

export const VideosSingleRoute: React.FC = () => {
  const isAddForm = useRouteMatch('/videos/add');
  const { videos, authors, categories } = useContext(VideosContext);
  let { videoId } = useParams<{ videoId?: string }>();
  const video: VideoInput | undefined = isAddForm
    ? { id: 0, name: '', authorId: 0, catIds: [] }
    : videos.find((video) => video.id === parseInt(videoId || '', 10));

  if (!video) {
    return <Redirect to="/videos" />;
  }

  return (
    <>
      <Breadcrumbs
        links={[
          { title: 'Videos', to: '/videos' },
          { title: isAddForm ? 'Add video' : 'Edit video', active: true },
        ]}
      />
      <Typography variant="h3" component="h1" gutterBottom>
        {isAddForm ? 'Add new video' : `Edit video: ${video.name}`}
      </Typography>
      <VideoForm key={video.id} video={video} authors={authors} categories={categories} />
    </>
  );
};
