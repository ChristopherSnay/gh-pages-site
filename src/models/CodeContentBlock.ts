import type { ContentBlock } from './ContentBlock';

export interface CodeContentBlock extends ContentBlock {
  type: 'code';
  content: string;
  language: string;
}
