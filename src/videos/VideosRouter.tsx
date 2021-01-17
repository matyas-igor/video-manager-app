import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { VideosIndexRoute } from './routes/VideosIndexRoute';
import { VideosSingleRoute } from './routes/VideosSingleRoute';
import { useVideos } from './hooks/useVideos';
import { VideosContext } from './VideosContext';
import { Error } from '../common/components/Error';

export const VideosRouter: React.FC = () => {
  const { error, authors, categories, videos, reload } = useVideos();
  return (
    <VideosContext.Provider value={{ authors, categories, videos, reload }}>
      <Error error={error} onRetry={reload} />
      <Switch>
        <Route exact path="/videos">
          <VideosIndexRoute />
        </Route>
        <Route path="/videos/add">
          <VideosSingleRoute />
        </Route>
        <Route path="/videos/edit/:videoId">
          <VideosSingleRoute />
        </Route>
        <Route path="*">
          <Redirect to="/videos" />
        </Route>
      </Switch>
    </VideosContext.Provider>
  );
};
