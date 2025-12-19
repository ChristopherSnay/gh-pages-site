import type { ContentBlockData } from './ContentBlockData';
import type { PostManifestEntry } from './PostManifestEntry';

export interface Post extends PostManifestEntry {
  // filename: string;
  // title: string;
  // date: string;
  // type: string;
  // tags: string[];
  // author: string;
  // image?: string;
  blocks?: ContentBlockData[];
}
