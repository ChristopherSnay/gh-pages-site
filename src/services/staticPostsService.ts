import type { PaginatedPosts } from '../models/PaginatedPosts';
import type { Post } from '../models/Post';
import type { PostManifestEntry } from '../models/PostManifestEntry';

const baseUrl = import.meta.env.BASE_URL || '/';
const defaultPageSize: number = Number(import.meta.env.VITE_DEFAULT_PAGE_SIZE);

export const staticPostsService = {
  fetchPosts: async (
    page: number = 1,
    pageSize: number = defaultPageSize,
    type?: string,
    tags?: string[]
  ): Promise<PaginatedPosts> => {
    const res = await fetch(`${baseUrl}data/posts-manifest.json`);
    let manifest: PostManifestEntry[] = await res.json();

    if (type) {
      manifest = manifest.filter((entry) => entry.type === type);
    }

    if (tags && tags.length > 0) {
      manifest = manifest.filter((entry) =>
        tags.every((tag) => entry.tags.includes(tag))
      );
    }

    // Sort by date descending
    manifest = manifest.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

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
