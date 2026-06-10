export type MomentMedia = {
  type: 'image' | 'video';
  src: string;
  alt?: string;
  poster?: string;
};

export type MomentMeta = {
  slug: string;
  title: string;
  summary?: string;
  createdAt: string;
  mood?: string;
  location?: string;
  tags: string[];
  media: MomentMedia[];
};

export type Moment = MomentMeta & {
  content: string;
};
