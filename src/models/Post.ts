import type { ContentBlock } from './ContentBlock';
import type { PostManifestEntry } from './PostManifestEntry';

export interface Post extends PostManifestEntry {
  // filename: string;
  // title: string;
  // date: string;
  // type: string;
  // tags: string[];
  // author: string;
  // image?: string;
  blocks?: ContentBlock[];
}
