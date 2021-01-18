import React from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Order, OrderBy, VideoProcessed } from '../../common/interfaces';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { VideoDeleteDialog } from './VideoDeleteDialog';
import { useVideoDelete } from '../hooks/useVideoDelete';

interface VideosTableProps {
  videos: VideoProcessed[];
  onDelete?: (video: VideoProcessed) => Promise<void>;
  order: Order;
  orderBy: OrderBy;
  onOrderChange: (orderBy: OrderBy) => void;
}

export const VideosTable: React.FC<VideosTableProps> = ({ order, orderBy, onOrderChange, videos, onDelete }) => {
  const { open, processing, name, onCancel, onConfirm, onRequest } = useVideoDelete(onDelete);
  return (
    <>
      {/* Videos table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sortDirection={orderBy === 'name' ? order : false}>
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={orderBy === 'name' ? order : 'asc'}
                  onClick={() => onOrderChange('name')}>
                  Video name
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === 'author' ? order : false}>
                <TableSortLabel
                  active={orderBy === 'author'}
                  direction={orderBy === 'author' ? order : 'asc'}
                  onClick={() => onOrderChange('author')}>
                  Author
                </TableSortLabel>
              </TableCell>
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
                <TableCell width={220}>
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
                  <Button size="small" variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={() => onRequest(video)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Video delete dialog */}
      <VideoDeleteDialog open={open} processing={processing} name={name} onCancel={onCancel} onClose={onCancel} onConfirm={onConfirm} />
    </>
  );
};
