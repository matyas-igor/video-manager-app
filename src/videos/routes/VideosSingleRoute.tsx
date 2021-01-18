import React, { useContext } from 'react';
import { Typography } from '@material-ui/core';
import { Redirect, useParams, useRouteMatch, useHistory } from 'react-router-dom';
import { Breadcrumbs } from '../../common/components/Breadcrumbs';
import { VideosContext } from '../VideosContext';
import { VideoForm } from '../components/VideoForm';
import { VideoInput } from '../../common/interfaces';
import { useVideoActions } from '../hooks/useVideoActions';

export const VideosSingleRoute: React.FC = () => {
  const history = useHistory();
  const { videos, authors, categories } = useContext(VideosContext);

  // handle form submitting when adding/editing video
  const { handleUpsert } = useVideoActions();
  const onSubmit = async (video: VideoInput) => {
    const result = await handleUpsert(video, videos, authors);
    if (result) {
      // go back to video list if update/edit was successful
      history.push('/videos?refresh=true');
    }
  };

  // preparing video to add/edit form
  const isAddForm = useRouteMatch('/videos/add');
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
      <VideoForm key={video.id} video={video} authors={authors} categories={categories} onSubmit={onSubmit} />
    </>
  );
};
