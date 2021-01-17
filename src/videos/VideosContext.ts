import React from 'react';
import { Author, Category, VideoProcessed } from '../common/interfaces';

interface VideosContextProps {
  authors: Author[];
  categories: Category[];
  videos: VideoProcessed[];
  reload: () => void;
}

export const VideosContext = React.createContext<VideosContextProps>({
  authors: [],
  categories: [],
  videos: [],
  reload: () => {},
});
