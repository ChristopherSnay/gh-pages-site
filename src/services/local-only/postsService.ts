import type { PaginatedPosts } from '../../models/PaginatedPosts';
import type { Post } from '../../models/Post';

export const postsService = {
  fetchPosts: async (
    page: number,
    pageSize: number,
    type?: string,
    tags?: string[]
  ): Promise<PaginatedPosts> => {
    const params = new URLSearchParams();
    if (page) params.set('page', page.toString());
    if (pageSize) params.set('pageSize', pageSize.toString());
    if (type) params.set('type', type);
    if (tags && tags.length > 0) params.set('tags', tags.join(','));

    const query = params.toString();
    const url = query ? `/api/posts?${query}` : '/api/posts';
    const response = await fetch(url);
    const json = await response.json();

    if (!response.ok) {
      throw new Error(`Failed to fetch posts. ${json.error || response.status}`);
    }

    return json.data;
  },
  fetchPostByFilename: async (filename: string): Promise<Post> => {
    const response = await fetch(`/api/posts/${filename}`);
    const json = await response.json();

    if (!response.ok) {
      throw new Error(`Failed to fetch post. ${json.error || response.status}`);
    }

    return json.data;
  },
  updatePost: async (post: Post): Promise<any> => {
    const response = await fetch(`/api/posts`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    });
    const json = await response.json();

    if (!response.ok) {
      throw new Error(`${json.error || response.status}`);
    }
    return json.data;
  },
  createPost: async (post: Post): Promise<any> => {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    });
    const json = await response.json();

    if (!response.ok) {
      throw new Error(`${json.error || response.status}`);
    }

    return json.data;
  },
  deletePost: async (filename: string): Promise<any> => {
    const response = await fetch(`/api/posts/${filename}`, {
      method: 'DELETE'
    });
    const json = await response.json();

    if (!response.ok) {
      throw new Error(`${json.error || response.status}`);
    }

    return json;
  }
};
