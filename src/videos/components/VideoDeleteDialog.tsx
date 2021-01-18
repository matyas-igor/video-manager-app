import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

export const VideoDeleteDialog: React.FC<{
  open: boolean;
  processing: boolean;
  name?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
}> = ({ open, processing, name, onClose, onCancel, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">Delete movie “{name}”?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure to delete this movie? This action is non-revertible.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="secondary" variant="contained" startIcon={<DeleteIcon />}>
          {processing ? 'Deleting…' : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
