import type { ContentBlock } from './ContentBlock';
import type { PostManifestEntry } from './PostManifestEntry';

export interface Post extends PostManifestEntry {
  content?: ContentBlock[];
}
