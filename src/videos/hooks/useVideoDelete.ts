import { useState } from 'react';
import { VideoProcessed } from '../../common/interfaces';

interface UseVideoDeleteReturn {
  open: boolean;
  processing: boolean;
  name?: string;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
  onRequest: (video: VideoProcessed) => void;
}

export const useVideoDelete = (onDelete?: (video: VideoProcessed) => Promise<void>): UseVideoDeleteReturn => {
  const [open, setOpen] = useState<boolean>(false);
  const [processing, setProcessing] = useState<boolean>(false);
  const [deleteVideo, setDeleteVideo] = useState<VideoProcessed | null>(null);

  const onCancel = () => {
    setOpen(false);
  };
  const onConfirm = async () => {
    setProcessing(true);
    if (deleteVideo) {
      await onDelete?.(deleteVideo);
    }
    setProcessing(false);
    setOpen(false);
  };
  const onRequest = (video: VideoProcessed) => {
    setDeleteVideo(video);
    setOpen(true);
  };

  return {
    open,
    processing,
    name: deleteVideo?.name,
    onConfirm,
    onCancel,
    onRequest,
  };
};
