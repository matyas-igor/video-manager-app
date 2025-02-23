import { Author } from '../../common/interfaces';

export const getAuthors = (): Promise<Author[]> => {
  return fetch(`${process.env.REACT_APP_API}/authors`, { cache: 'no-cache' }).then((response) => (response.json() as unknown) as Author[]);
};

export const updateAuthor = (authorId: number, videos: any): Promise<Response> => {
  return fetch(`${process.env.REACT_APP_API}/authors/${authorId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ videos }),
  });
};

export const createAuthorVideo = (author: Author, video: any): Promise<Response> => {
  const videos = [...author.videos, video];
  return updateAuthor(author.id, videos);
};

export const updateAuthorVideo = (author: Author, video: any): Promise<Response> => {
  const videos = author.videos.map((v) => (v.id === video.id ? video : v));
  return updateAuthor(author.id, videos);
};

export const deleteAuthorVideo = (author: Author, videoId: number): Promise<Response> => {
  const videos = author.videos.filter((v) => v.id !== videoId);
  return updateAuthor(author.id, videos);
};
