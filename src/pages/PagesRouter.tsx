import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Typography } from '@material-ui/core';

export const PagesRouter: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/about">
        <Typography variant="h3" component="h1" gutterBottom>
          About us
        </Typography>
        <Typography>
          Page is under construction
        </Typography>
      </Route>
      <Route exact path="/faq">
        <Typography variant="h3" component="h1" gutterBottom>
          FAQs
        </Typography>
        <Typography>
          Page is under construction
        </Typography>
      </Route>
    </Switch>
  );
};
