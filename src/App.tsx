import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { TopMenu } from './common/components/TopMenu';
import { VideosRouter } from './videos/VideosRouter';
import { PagesRouter } from './pages/PagesRouter';
import { Container } from '@material-ui/core';

const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Router>
        <TopMenu />
        <Container style={{ marginTop: '40px', marginBottom: '40px' }}>
          <Switch>
            <Route path="/videos">
              <VideosRouter />
            </Route>
            <Route path="/">
              <PagesRouter />
            </Route>
            <Route path="*">
              <Redirect to="/videos" />
            </Route>
          </Switch>
        </Container>
      </Router>
    </>
  );
};

export default App;
