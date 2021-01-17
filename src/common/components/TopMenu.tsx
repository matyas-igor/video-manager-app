import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 0,
    },
    leftLinks: {
      flexGrow: 1,
      marginLeft: theme.spacing(2),
    },
    rightLinks: {
      flexGrow: 0,
      marginLeft: theme.spacing(2),
    },
  })
);

export const TopMenu: React.FC = () => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <div className={classes.title}>
          <Typography variant="h6">Videos</Typography>
        </div>
        <div className={classes.leftLinks}></div>
        <div className={classes.rightLinks}>
          <Button component={Link} color="inherit" startIcon={<AddIcon />} to="/videos/add">
            Add video
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};
