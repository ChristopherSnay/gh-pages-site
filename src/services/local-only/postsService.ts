import type { PaginatedPosts } from '../../models/PaginatedPosts';
import type { Post } from '../../models/Post';

export const postsService = {
  fetchPosts: async (page: number, pageSize: number): Promise<PaginatedPosts> => {
    const response = await fetch(`/api/posts?page=${page}&pageSize=${pageSize}`);
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    return response.json();
  },
  fetchPostByFilename: async (filename: string): Promise<Post> => {
    const response = await fetch(`/api/posts/${filename}`);
    if (!response.ok) {
      throw new Error('Failed to fetch post');
    }
    return response.json();
  }
};
