import React from 'react';
import { Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Redirect, Route, Switch } from 'react-router-dom';
import { VideosIndexRoute } from './routes/VideosIndexRoute';
import { VideosSingleRoute } from './routes/VideosSingleRoute';
import { useVideos } from './hooks/useVideos';
import { VideosContext } from './VideosContext';

export const VideosRouter: React.FC = () => {
  const { error, authors, categories, videos, reload } = useVideos();
  return (
    <>
      {error ? (
        <Alert
          action={
            <Button color="inherit" size="small" onClick={reload}>
              Retry
            </Button>
          }>
          {error.message}
        </Alert>
      ) : (
        <VideosContext.Provider value={{ authors, categories, videos, reload }}>
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
      )}
    </>
  );
};
