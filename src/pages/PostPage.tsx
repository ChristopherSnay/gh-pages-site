import { Button, Paper, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import AuthorAvatar from '../components/AuthorAvatar';
import ImageBackdrop from '../components/Post/ImageBackdrop';
import PostContentBlock from '../components/Post/PostContentBlock';
import usePost from '../hooks/usePost';
import { localDate } from '../utils/localDate';

export default function PostPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { post, loading, error } = usePost(id || '');

  const handleEditClick = () => {
    navigate(`/admin/post/${id}`);
  };
  return (
    <>
      {loading && (
        <div className="container my-4">
          <Typography>Loading...</Typography>
        </div>
      )}
      {error && (
        <div className="container my-4">
          <Typography color="error">{String(error)}</Typography>
        </div>
      )}
      {post && (
        <>
          <ImageBackdrop src={post.cover} id={post.filename} title={post.title} />

          <div className="container">
            <div className="row justify-content-center">
              <Paper elevation={0} className="col-md-8 px-4">
                <div className="my-3">
                  <AuthorAvatar date={localDate(post.date)} name={post.author} />
                </div>
                {import.meta.env.MODE === 'development' && (
                  <Button className="mb-2" onClick={handleEditClick}>
                    Edit Post
                  </Button>
                )}
                <hr className="m-0" />

                <header className="pt-4 pb-5">
                  <Typography variant="h4">{post.title}</Typography>
                  <Typography variant="overline">
                    {post.tags?.join(', ').toUpperCase()}
                  </Typography>
                </header>

                {post.blocks?.map((block, blockIndex) => (
                  <PostContentBlock key={blockIndex} block={block} />
                ))}
              </Paper>
            </div>
          </div>
        </>
      )}
    </>
  );
}
