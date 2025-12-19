import type { ContentBlock } from './ContentBlock';

export interface ImageContentBlock extends ContentBlock {
  type: 'image';
  url: string;
  alt?: string;
  caption?: string;
}
