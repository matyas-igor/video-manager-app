import { getCategories } from './categories';
import { createAuthorVideo, deleteAuthorVideo, getAuthors, updateAuthorVideo } from './authors';
import { Author, Category, VideoInput, VideoProcessed } from '../../common/interfaces';

export const getVideos = (): Promise<[VideoProcessed[], Category[], Author[]]> => {
  return Promise.all([getCategories(), getAuthors()]).then(([categories, authors]) => {
    const categoriesNames: { [key: number]: string } = categories.reduce((acc, category) => ({ ...acc, [category.id]: category.name }), {});
    const authorsNames: { [key: number]: string } = authors.reduce((acc, author) => ({ ...acc, [author.id]: author.name }), {});

    const videos: VideoProcessed[] = [];
    authors.forEach((author) => {
      const videosByAuthor: VideoProcessed[] = author.videos.map((video) => ({
        id: video.id,
        name: video.name,
        author: authorsNames[author.id],
        categories: video.catIds.sort().map((catId) => categoriesNames[catId]),
        authorId: author.id,
        catIds: video.catIds,
      }));
      videos.push(...videosByAuthor);
    });

    // sorting videos by `id`
    videos.sort((a, b) => a.id - b.id);

    // sorting categories and authors by `name`
    categories.sort((a: Category, b: Category) => a.name.localeCompare(b.name));
    authors.sort((a: Author, b: Author) => a.name.localeCompare(b.name));

    return [videos, categories, authors];
  });
};

export const upsertVideo = (video: VideoInput, videos: VideoProcessed[], authors: Author[]): Promise<Response> => {
  const author = authors.find((a) => a.id === video.authorId);
  const videoExisted = video.id > 0 ? videos.find((v) => v.id === video.id) : undefined;
  const videoLastId = videos[videos.length - 1]?.id || 0;

  if (videoExisted) {
    // editing existing video
    if (videoExisted.authorId === video.authorId) {
      // author hasn't changed - just update video
      return updateAuthorVideo(author!, { id: video.id, name: video.name, catIds: video.catIds });
    } else {
      // author has changed - first remove video from the last author & then add to a new one
      const authorExisted = authors.find((a) => a.id === videoExisted.authorId);
      return deleteAuthorVideo(authorExisted!, video.id).then(() =>
        createAuthorVideo(author!, { id: videoLastId + 1, name: video.name, catIds: video.catIds })
      );
    }
  } else {
    // adding new video
    return createAuthorVideo(author!, { id: videoLastId + 1, name: video.name, catIds: video.catIds });
  }
};
