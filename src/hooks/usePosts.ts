import { useEffect, useState } from 'react';
import { CONFIG } from '../constants/config';
import type { Post } from '../models/Post';
import { postsService } from '../services/local-only/postsService';
import { staticPostsService } from '../services/staticPostsService';

const isDev = import.meta.env.MODE === 'development';

export const usePosts = (type?: string) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(CONFIG.DEFAULT_PAGE_SIZE);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = isDev
          ? await postsService.fetchPosts(page, CONFIG.DEFAULT_PAGE_SIZE, type)
          : await staticPostsService.fetchPosts(page, CONFIG.DEFAULT_PAGE_SIZE, type);

        response.posts.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        setPage(response.page);
        setTotalPages(response.totalPages);
        setPageSize(response.pageSize);
        setTotal(response.total);
        setPosts(response.posts);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [type, page]);

  return { posts, loading, error, page, totalPages, pageSize, total, setPage };
};
