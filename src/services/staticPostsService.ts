import { CONFIG } from '../constants/config';
import type { PaginatedPosts } from '../models/PaginatedPosts';
import type { Post } from '../models/Post';
import type { PostManifestEntry } from '../models/PostManifestEntry';

const base = import.meta.env.BASE_URL || '/';

export const staticPostsService = {
  fetchPosts: async (
    page = 1,
    pageSize = CONFIG.DEFAULT_PAGE_SIZE
  ): Promise<PaginatedPosts> => {
    const res = await fetch(`${base}/data/posts-manifest.json`);
    const manifest: PostManifestEntry[] = await res.json();

    // Sort by date descending
    manifest.sort((a, b) => b.filename.localeCompare(a.date));

    const total = manifest.length;
    const totalPages = Math.ceil(total / pageSize);
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const posts = manifest.slice(start, end);

    return { posts, page, pageSize, total, totalPages };
  },
  fetchPostByFilename: async (filename: string): Promise<Post> => {
    const res = await fetch(`/data/${filename}`);
    if (!res.ok) {
      throw new Error('Post not found');
    }
    return res.json();
  }
};
