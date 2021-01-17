import React from 'react';
import { Typography, LinearProgress } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
    },
    title: {
      marginBottom: theme.spacing(2),
    },
  })
);

export const Progress: React.FC<{ title?: string }> = ({ title }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      {title && <Typography className={classes.title} align="center">{title}</Typography>}
      <LinearProgress />
    </div>
  );
};
