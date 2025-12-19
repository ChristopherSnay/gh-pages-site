import type { ContentBlockData } from './ContentBlockData';

export interface CodeContentBlockData extends ContentBlockData {
  type: 'code';
  content: string;
  language: string;
}
