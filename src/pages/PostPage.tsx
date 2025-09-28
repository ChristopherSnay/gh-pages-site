import { Paper, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import AuthorAvatar from '../components/AuthorAvatar';
import ImageBackdrop from '../components/ImageBackdrop';
import usePost from '../hooks/usePost';
import { localDate } from '../utils/localDate';

export default function PostPage() {
  const { id } = useParams();
  const { post, loading, error } = usePost(id || '');

  return (
    <>
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{String(error)}</Typography>}
      {post && (
        <>
          <ImageBackdrop src={post.image} id={post.filename} title={post.title} />

          <div className="container">
            <div className="row justify-content-center">
              <Paper elevation={0} className="col-md-8 px-4">
                <div className="my-3">
                  <AuthorAvatar date={localDate(post.date)} />
                </div>

                <hr className="m-0" />

                <header className="pt-4 pb-5">
                  <Typography variant="h4">{post.title}</Typography>
                  <Typography variant="overline">
                    {post.tags.join(', ').toUpperCase()}
                  </Typography>
                </header>

                {/* {post.blocks?.map((block, blockIndex) => (
                                    <PostBlock key={blockIndex} index={blockIndex} block={block} />
                                ))} */}
              </Paper>
            </div>
          </div>
        </>
      )}
    </>
  );
}
