import { Pagination } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';
import { CONFIG } from '../constants/config';
import { usePosts } from '../hooks/usePosts';

export default function PostsPage() {
  const [page, setPage] = useState<number>(1);
  const { posts, loading, error } = usePosts();
  const navigate = useNavigate();

  const handlePostClick = (filename: string) => {
    navigate(`/post/${filename}`);
  };

  return (
    <div className="container d-flex flex-column">
      {loading && <p>Loading posts...</p>}

      {error != null && <p style={{ color: 'red' }}>Error: {String(error)}</p>}
      <div className="row g-3">
        {posts.map((post, postIndex) => (
          <div key={postIndex} className="col-xl-4 col-md-6">
            <PostCard post={post} onPostClick={handlePostClick} />
          </div>
        ))}
      </div>

      <Pagination
        className="align-self-center my-4"
        count={Math.ceil(posts.length / CONFIG.DEFAULT_PAGE_SIZE)}
        page={page}
        onChange={(_e, value: number) => setPage(value)}
      />
    </div>
  );
}
