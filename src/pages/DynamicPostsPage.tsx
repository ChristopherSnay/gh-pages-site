import { useNavigate, useParams } from 'react-router-dom';
import PostCard from '../components/PostCard';
import { usePosts } from '../hooks/usePosts';

//TODO: need to gate unrecognized post types
export default function DynamicPostsPage() {
  const { postType } = useParams();
  const { posts } = usePosts(postType);
  const navigate = useNavigate();

  const handlePostClick = (filename: string) => {
    navigate(`/post/${filename}`);
  };

  return (
    <section className="container mt-4">
      <h1 className="text-capitalize">{postType}</h1>
      <div className="row g-3">
        {posts.map((post, postIndex) => (
          <div key={postIndex} className="col-xl-4 col-md-6">
            <PostCard post={post} onPostClick={handlePostClick} />
          </div>
        ))}
      </div>
    </section>
  );
}
