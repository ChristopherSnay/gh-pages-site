import { Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';
import { usePosts } from '../hooks/usePosts';

export default function PostsPage() {
  const { posts, loading, error, totalPages, page, setPage } = usePosts('featured');
  const navigate = useNavigate();

  const handlePostClick = (filename: string) => {
    navigate(`/post/${filename}`);
  };

  const handlePageClick = (_e: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <div className="container d-flex flex-column mt-4">
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
        count={totalPages}
        page={page}
        onChange={handlePageClick}
      />
    </div>
  );
}
