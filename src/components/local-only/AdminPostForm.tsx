import { Alert, Button, Snackbar, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAdminPost from '../../hooks/local-only/useAdminPost';
import type { AlertDetail } from '../../models/AlertDetail';
import type { ContentBlockData } from '../../models/ContentBlockData';
import AdminContentBlockList from './AdminContentBlockList';
import AdminContentBlockMenu from './AdminContentBlockMenu';

export default function AdminPostForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { post, updatePost, savePost, deletePost } = useAdminPost(id || '');
  const [snackbarOpen, setSnackbarOpen] = useState<AlertDetail | null>(null);

  const handleCancelClick = () => {
    navigate(-1);
  };

  const handleDeleteClick = async () => {
    const result = await deletePost();
    if (result && !result.error) {
      navigate('/admin');
    } else {
      alert(result?.error || 'Delete failed');
    }
  };

  const handleSaveClick = async () => {
    try {
      const response = await savePost();
      setSnackbarOpen({
        success: true,
        message: response?.message || 'Post saved successfully'
      });
      // Append post.filename to the current URL after save
      if (response.filename) {
        navigate(`/admin/post/${response.filename}`);
      }
    } catch (error) {
      console.error('Error saving post:', error);
      setSnackbarOpen({ success: false, message: String(error) });
    }
  };

  const handleViewClick = () => {
    if (post?.filename) {
      navigate(`/post/${post.filename}`);
    }
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(', ');
    updatePost({ ...post, tags });
  };

  const handleBlockAdd = (blockType: ContentBlockData['type']) => {
    const newBlock: ContentBlockData = { type: blockType, content: '' };
    const updatedBlocks = post?.blocks ? [...post.blocks, newBlock] : [newBlock];
    updatePost({ ...post, blocks: updatedBlocks });
  };

  useEffect(() => {
    if (!post?.author) {
      updatePost({ ...post, author: import.meta.env.VITE_USERNAME });
    }
  }, [post]);

  return (
    <form className="d-flex flex-column">
      <div className="d-flex align-items-center justify-content-between">
        <h1 className="m-0">{post?.filename ? 'Edit Post' : 'New Post'}</h1>
        {post?.filename && (
          <div>
            <Button onClick={handleViewClick}>View Post</Button>
          </div>
        )}
      </div>

      <hr className="mt-0" />
      <div>
        <h2>Post Details</h2>
        <div className="border rounded row m-0 mt-3 g-3 px-2 py-3">
          <div className="col-12 col-md-6">
            <TextField
              fullWidth
              label="Post Title"
              value={post?.title || ''}
              onChange={(e) => updatePost({ ...post, title: e.target.value })}
            />
          </div>
          <div className="col-12 col-md-6">
            <TextField
              fullWidth
              label="author"
              value={post?.author || ''}
              onChange={(e) => updatePost({ ...post, author: e.target.value })}
            />
          </div>
          <div className="col-12 col-md-6">
            <TextField
              fullWidth
              label="type"
              value={post?.type || ''}
              onChange={(e) => updatePost({ ...post, type: e.target.value })}
            />
          </div>
          <div className="col-12 col-md-6">
            <TextField
              fullWidth
              label="tags"
              value={post?.tags?.join(', ') || ''}
              onChange={handleTagChange}
            />
          </div>
          <div className="col-12 col-md-6">
            <TextField
              fullWidth
              label="date"
              value={post?.date || ''}
              onChange={(e) => updatePost({ ...post, date: e.target.value })}
            />
          </div>
          <div className="col-12 col-md-6">
            <TextField
              fullWidth
              label="cover"
              value={post?.cover || ''}
              onChange={(e) => updatePost({ ...post, cover: e.target.value })}
            />
          </div>
        </div>
        <hr />

        <div className="d-flex align-items-center justify-content-between">
          <div>
            <h2 className="m-0">Post Content</h2>
            <Typography>Content Blocks</Typography>
          </div>
          <AdminContentBlockMenu onBlockAdd={handleBlockAdd} />
        </div>

        <div className="col-12 mt-3">
          {post && (
            <AdminContentBlockList
              blocks={post.blocks}
              onChange={(blocks: ContentBlockData[]) => updatePost({ ...post, blocks })}
            />
          )}
        </div>

        <hr />
        <div className="col-12 m-0 gap-2 d-flex justify-content-end">
          <Button onClick={handleCancelClick}>Cancel</Button>
          {post?.filename && <Button onClick={handleDeleteClick}>Delete</Button>}
          <Button variant="outlined" onClick={handleSaveClick}>
            Save
          </Button>
        </div>
      </div>

      <Snackbar
        open={!!snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(null)}
      >
        <Alert severity={snackbarOpen?.success === true ? 'success' : 'error'}>
          {snackbarOpen?.message}
        </Alert>
      </Snackbar>
    </form>
  );
}
