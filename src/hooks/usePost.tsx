import { useEffect, useState } from 'react';
import type { Post } from '../models/Post';
import { postsService } from '../services/local-only/postsService';
import { staticPostsService } from '../services/staticPostsService';

const isDev = import.meta.env.MODE === 'development';

export default function usePost(filename: string) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedPost = isDev
          ? await postsService.fetchPostByFilename(filename)
          : await staticPostsService.fetchPostByFilename(filename);
        setPost(fetchedPost);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [filename]);

  return { post, loading, error };
}
