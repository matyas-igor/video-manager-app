export interface Category {
  id: number;
  name: string;
}

export interface Video {
  id: number;
  catIds: number[];
  name: string;
}

export interface Author {
  id: number;
  name: string;
  videos: Video[];
}

export interface VideoProcessed {
  id: number;
  name: string;
  author: string;
  categories: string[];
  authorId: number;
  catIds: number[];
  search: string;
}

export interface VideoInput {
  id: number;
  name: string;
  authorId: number;
  catIds: number[];
}

export type Order = 'asc' | 'desc';
export type OrderBy = 'name' | 'author';
