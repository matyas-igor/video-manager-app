import React from 'react';
import { Author, Category, ProcessedVideo } from '../common/interfaces';

interface VideosContextProps {
  error: Error | null;
  loading: boolean;
  authors: Author[];
  categories: Category[];
  videos: ProcessedVideo[];
  refetch: () => void;
}

export const VideosContext = React.createContext<VideosContextProps>({
  error: null,
  loading: false,
  authors: [],
  categories: [],
  videos: [],
  refetch: () => {},
});
