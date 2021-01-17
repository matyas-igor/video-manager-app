import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import { Link, useRouteMatch } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 0,
    },
    leftLinks: {
      flexGrow: 1,
      marginLeft: theme.spacing(3),
    },
    rightLinks: {
      flexGrow: 0,
      marginLeft: theme.spacing(3),
    },
  })
);

export const TopMenu: React.FC = () => {
  const classes = useStyles();
  const isHomePage = useRouteMatch('/videos');
  const isAboutPage = useRouteMatch('/about');
  const isFAQPage = useRouteMatch('/faq');
  return (
    <AppBar position="static">
      <Toolbar>
        <div className={classes.title}>
          <Typography variant="h6">Videos</Typography>
        </div>
        <div className={classes.leftLinks}>
          <Button disabled={isHomePage?.isExact} component={Link} color="inherit" to="/videos">
            Home
          </Button>
          <Button disabled={isAboutPage?.isExact} component={Link} color="inherit" to="/about">
            About us
          </Button>
          <Button disabled={isFAQPage?.isExact} component={Link} color="inherit" to="/faq">
            FAQs
          </Button>
        </div>
        <div className={classes.rightLinks}>
          <Button component={Link} color="inherit" startIcon={<AddIcon />} to="/videos/add">
            Add video
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};
