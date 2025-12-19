import type { PaginatedPosts } from '../models/PaginatedPosts';
import type { Post } from '../models/Post';
import type { PostManifestEntry } from '../models/PostManifestEntry';

const baseUrl = import.meta.env.BASE_URL || '/';
const defaultPageSize = import.meta.env.VITE_DEFAULT_PAGE_SIZE;

export const staticPostsService = {
  fetchPosts: async (
    page = 1,
    pageSize = defaultPageSize,
    type?: string
  ): Promise<PaginatedPosts> => {
    const res = await fetch(`${baseUrl}data/posts-manifest.json`);
    let manifest: PostManifestEntry[] = await res.json();

    // Sort by date descending
    manifest.sort((a, b) => b.filename.localeCompare(a.date));

    if (type) {
      manifest = manifest.filter((entry) => entry.type === type);
    }

    const total = manifest.length;
    const totalPages = Math.ceil(total / pageSize);
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const posts = manifest.slice(start, end);

    return { posts, page, pageSize, total, totalPages };
  },
  fetchPostByFilename: async (filename: string): Promise<Post> => {
    const res = await fetch(`${baseUrl}/data/${filename}`);
    if (!res.ok) {
      throw new Error('Post not found');
    }
    return res.json();
  }
};
