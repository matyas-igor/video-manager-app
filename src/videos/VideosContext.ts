import React from 'react';
import { Author, Category, ProcessedVideo } from '../common/interfaces';

interface VideosContextProps {
  authors: Author[];
  categories: Category[];
  videos: ProcessedVideo[];
  refetch: () => void;
}

export const VideosContext = React.createContext<VideosContextProps>({
  authors: [],
  categories: [],
  videos: [],
  refetch: () => {},
});
