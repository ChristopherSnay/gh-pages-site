import { useEffect, useState } from 'react';
import { CONFIG } from '../constants/config';
import { postsService } from '../services/local-only/postsService';
import { staticPostsService } from '../services/staticPostsService';

const isDev = import.meta.env.MODE === 'development';

export const usePosts = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = isDev
          ? await postsService.fetchPosts(1, CONFIG.DEFAULT_PAGE_SIZE)
          : await staticPostsService.fetchPosts(1, CONFIG.DEFAULT_PAGE_SIZE);
        setPosts(response.posts);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return { posts, loading, error };
};
