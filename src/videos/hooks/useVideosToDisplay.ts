import fuzzysort from 'fuzzysort';
import { Order, OrderBy, VideoProcessed } from '../../common/interfaces';
import { useMemo } from 'react';

export const useVideosToDisplay = (videos: VideoProcessed[], search: string, orderBy: OrderBy, order: Order): VideoProcessed[] => {
  return useMemo(() => {
    return !search
      ? videos
      : fuzzysort
          .go<VideoProcessed>(search, videos, { key: 'search' })
          .map(({ obj }) => obj);
  }, [videos, search]);
};
