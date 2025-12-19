import { useCallback, useEffect, useState } from 'react';
import type { Post } from '../../models/Post';
import { postsService } from '../../services/local-only/postsService';

export default function useAdminPost(filename: string) {
  const [post, setPost] = useState<Partial<Post> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown | null>(null);

  const updatePost = (updatedPost: Partial<Post>) => {
    setPost(updatedPost);
  };

  const createPost = (newPost: Post) => {
    setPost(newPost);
  };

  const deletePost = useCallback(async () => {
    if (!filename) {
      return;
    }

    return await postsService.deletePost(filename);
  }, [filename]);

  const savePost = async () => {
    if (!post) return;

    const cleanedPost: Partial<Post> = {
      ...post,
      tags: post.tags?.map((tag) => tag.trim()).filter((tag) => tag.length > 0)
    };

    if (!post.filename) {
      const result = await postsService.createPost(cleanedPost as Post);
      setPost(result);
      return result;
    } else {
      const result = await postsService.updatePost(cleanedPost as Post);
      setPost(result);
      return result;
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(null);

      try {
        const fetchedPost = await postsService.fetchPostByFilename(filename);
        setPost(fetchedPost);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [filename]);

  return { post, loading, error, updatePost, createPost, savePost, deletePost };
}
