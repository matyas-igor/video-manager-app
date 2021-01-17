import React from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { VideoProcessed } from '../../common/interfaces';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

interface VideosTableProps {
  videos: VideoProcessed[];
}

export const VideosTable: React.FC<VideosTableProps> = ({ videos }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Video Name</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Categories</TableCell>
            <TableCell>Options</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {videos.map((video) => (
            <TableRow key={video.id}>
              <TableCell>{video.name}</TableCell>
              <TableCell>{video.author}</TableCell>
              <TableCell>{video.categories.join(', ')}</TableCell>
              <TableCell>
                <Button
                  component={Link}
                  size="small"
                  variant="contained"
                  color="primary"
                  startIcon={<EditIcon />}
                  to={`/videos/edit/${video.id}`}>
                  Edit
                </Button>
                &nbsp;
                <Button size="small" variant="contained" color="secondary" startIcon={<DeleteIcon />}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
