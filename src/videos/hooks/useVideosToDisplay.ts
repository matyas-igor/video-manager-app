import fuzzysort from 'fuzzysort';
import { VideoProcessed } from '../../common/interfaces';
import { useMemo } from 'react';

export const useVideosToDisplay = (videos: VideoProcessed[], search: string): VideoProcessed[] => {
  return useMemo(() => {
    return !search
      ? videos
      : fuzzysort
          .go<VideoProcessed>(search, videos, { key: 'search' })
          .map(({ obj }) => obj);
  }, [videos, search]);
};
