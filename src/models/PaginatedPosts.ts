import type { PostManifestEntry } from './PostManifestEntry';

export interface PaginatedPosts {
  posts: PostManifestEntry[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}
