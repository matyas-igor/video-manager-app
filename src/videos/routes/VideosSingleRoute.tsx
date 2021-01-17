import React from 'react';
import { Typography } from '@material-ui/core';
import { useRouteMatch } from 'react-router-dom';
import { Breadcrumbs } from '../../common/components/Breadcrumbs';

export const VideosSingleRoute: React.FC = () => {
  const isAddForm = useRouteMatch('/videos/add');
  return (
    <>
      <Breadcrumbs
        links={[
          { title: 'Videos', to: '/videos' },
          { title: isAddForm ? 'Add video' : 'Edit video', active: true },
        ]}
      />
      <Typography variant="h3" component="h1" gutterBottom>
        {isAddForm ? 'Add new video' : 'Edit video'}
      </Typography>
    </>
  );
};
