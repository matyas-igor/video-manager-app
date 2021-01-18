import { useSnackbar } from 'notistack';
import { Author, VideoInput, VideoProcessed } from '../../common/interfaces';
import { deleteVideo, upsertVideo } from '../services/videos';

interface UseVideoActionsReturn {
  handleUpsert: (video: VideoInput, videos: VideoProcessed[], authors: Author[]) => Promise<boolean | void>;
  handleDelete: (video: VideoProcessed, authors: Author[]) => Promise<boolean | void>;
}

export const useVideoActions = (): UseVideoActionsReturn => {
  const { enqueueSnackbar } = useSnackbar();

  // sending request to add/update video
  const handleUpsert = (video: VideoInput, videos: VideoProcessed[], authors: Author[]) => {
    return upsertVideo(video, videos, authors)
      .then((result) => {
        if (result) {
          enqueueSnackbar(`Video has been successfully ${video.id > 0 ? 'updated' : 'added'}`, {
            variant: 'success',
          });
          return true;
        } else {
          enqueueSnackbar(`Error while ${video.id > 0 ? 'updating' : 'adding'} video`, {
            variant: 'error',
          });
          return false;
        }
      })
      .catch((e) => {
        enqueueSnackbar(`Error while ${video.id > 0 ? 'updating' : 'adding'} video: ${e.message}`, {
          variant: 'error',
        });
      });
  };

  // sending request to delete video
  const handleDelete = (video: VideoProcessed, authors: Author[]) => {
    return deleteVideo(video, authors)
      .then((result) => {
        if (result) {
          enqueueSnackbar(`Video has been successfully deleted`, { variant: 'success' });
          return true;
        } else {
          enqueueSnackbar(`Error while deleting video`, { variant: 'error' });
          return false;
        }
      })
      .catch((e) => {
        enqueueSnackbar(`Error while deleting video: ${e.message}`, { variant: 'error' });
      });
  };

  return { handleUpsert, handleDelete };
};
