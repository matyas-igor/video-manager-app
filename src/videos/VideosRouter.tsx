import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { VideosIndexRoute } from './routes/VideosIndexRoute';
import { VideosSingleRoute } from './routes/VideosSingleRoute';
import { useVideos } from './hooks/useVideos';
import { VideosContext } from './VideosContext';

export const VideosRouter: React.FC = () => {
  const { error, loading, authors, categories, videos, refetch } = useVideos();
  return (
    <VideosContext.Provider value={{ authors, categories, videos, refetch }}>
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
