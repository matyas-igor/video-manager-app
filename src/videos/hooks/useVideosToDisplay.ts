import fuzzysort from 'fuzzysort';
import { Order, OrderBy, VideoProcessed } from '../../common/interfaces';
import { useMemo } from 'react';

const sorters: { [orderBy in OrderBy]: (videos: VideoProcessed[], order: Order) => VideoProcessed[] } = {
  name: (videos: VideoProcessed[], order: Order) =>
    videos.sort((a, b) => (order === 'desc' ? -1 : 1) * (a.name.localeCompare(b.name) || a.author.localeCompare(b.author))),
  author: (videos: VideoProcessed[], order: Order) =>
    videos.sort((a, b) => (order === 'desc' ? -1 : 1) * (a.author.localeCompare(b.author) || a.name.localeCompare(b.name))),
};

export const useVideosToDisplay = (videos: VideoProcessed[], search: string, orderBy: OrderBy, order: Order): VideoProcessed[] => {
  return useMemo(() => {
    const videosSearched = !search
      ? videos
      : fuzzysort
          .go<VideoProcessed>(search, videos, { key: 'search' })
          .map(({ obj }) => obj);
    return sorters[orderBy](videosSearched, order);
  }, [videos, search, orderBy, order]);
};
