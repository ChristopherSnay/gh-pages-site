import type { ContentBlockData } from './ContentBlockData';

export interface HyperlinkContentBlockData extends ContentBlockData {
  type: 'hyperlink';
  url: string;
}
