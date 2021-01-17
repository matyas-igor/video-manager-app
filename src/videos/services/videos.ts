import { getCategories } from './categories';
import { getAuthors } from './authors';
import { Author, Category, VideoProcessed } from '../../common/interfaces';

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
