export type PostMeta = {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  category: string;
  coverImage?: string;
  readingTime: number;
  isFeatured?: boolean;
};

export type Post = PostMeta & {
  content: string;
};
