// hook fetches misc data for videos, later can be added more infos
import { useEffect, useState } from 'react';
import { Author, Category, ProcessedVideo } from '../../common/interfaces';
import { getVideos } from '../services/videos';

interface UseVideosReturns {
  error: Error | null;
  loading: boolean;
  authors: Author[];
  categories: Category[];
  videos: ProcessedVideo[];
  refetch: () => void;
}

export const useVideos = (): UseVideosReturns => {
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [videos, setVideos] = useState<ProcessedVideo[]>([]);

  // all data fetching function
  const start = () => {
    setLoading(true);
    getVideos()
      .then(([videos, categories, authors]) => {
        setError(null);
        setCategories(categories);
        setAuthors(authors);
        setVideos(videos);
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const refetch = (): void => {
    start();
  };

  // initial kick-off of data loading
  useEffect(() => {
    start();
  }, []);

  return { error, loading, authors, categories, videos, refetch };
};
