import React from 'react';
import { Breadcrumbs as MuiBreadcrumbs, Link, Typography } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginBottom: theme.spacing(2),
    },
  })
);

interface BreadcrumbsProps {
  links: {
    title: string;
    to?: string;
    active?: boolean;
  }[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ links }) => {
  const classes = useStyles();
  return (
    <MuiBreadcrumbs className={classes.container} aria-label="breadcrumbs">
      {links.map((link, index) =>
        link.active ? (
          <Typography key={index} color="textPrimary">
            {link.title}
          </Typography>
        ) : (
          <Link key={index} component={RouterLink} color="inherit" to={link.to || ''}>
            {link.title}
          </Link>
        )
      )}
    </MuiBreadcrumbs>
  );
};
