import type { ContentBlockData } from './ContentBlockData';

export interface ImageContentBlockData extends ContentBlockData {
  type: 'image';
  url: string;
  alt?: string;
  caption?: string;
}
