import { useSnackbar } from 'notistack';
import { Author, VideoInput, VideoProcessed } from '../../common/interfaces';
import { upsertVideo } from '../services/videos';

interface UseVideoFormReturn {
  handleSubmit: (video: VideoInput, videos: VideoProcessed[], authors: Author[]) => Promise<boolean | void>;
}

export const useVideoForm = (): UseVideoFormReturn => {
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = (video: VideoInput, videos: VideoProcessed[], authors: Author[]) => {
    return upsertVideo(video, videos, authors)
      .then(({ status }) => {
        if (status === 200) {
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
  return { handleSubmit };
};
