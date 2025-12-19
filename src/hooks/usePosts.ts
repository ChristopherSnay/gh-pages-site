import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Post } from '../models/Post';
import { postsService } from '../services/local-only/postsService';
import { staticPostsService } from '../services/staticPostsService';

const isDev = import.meta.env.MODE === 'development';
const defaultPageSize = import.meta.env.VITE_DEFAULT_PAGE_SIZE;

export const usePosts = (type?: string) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(defaultPageSize);
  const [total, setTotal] = useState<number>(0);
  const [searchParams] = useSearchParams();
  const pageParam = searchParams.get('page');
  const initialPage = pageParam ? parseInt(pageParam, 10) : 1;
  const [page, setPage] = useState<number>(initialPage);

  useEffect(() => {
    const newPage = pageParam ? parseInt(pageParam, 10) : 1;
    if (newPage !== page) {
      setPage(newPage);
    }
  }, [pageParam]);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = isDev
          ? await postsService.fetchPosts(page, defaultPageSize, type)
          : await staticPostsService.fetchPosts(page, defaultPageSize, type);

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
