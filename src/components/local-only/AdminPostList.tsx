import EditIcon from '@mui/icons-material/Edit';
import { IconButton, List, ListItem, ListItemText, Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { usePosts } from '../../hooks/usePosts';

export default function AdminPostList() {
  const navigate = useNavigate();
  const { posts, page, totalPages, setPage } = usePosts();

  const handleEdit = (filename: string) => {
    navigate(`/admin/post\/${filename}`);
  };

  return (
    <div>
      <List sx={{ maxWidth: 600 }}>
        {posts.map((post) => (
          <ListItem
            key={post.filename}
            disablePadding
            secondaryAction={
              <IconButton edge="end" onClick={() => handleEdit(post.filename)}>
                <EditIcon />
              </IconButton>
            }
          >
            <ListItemText
              primary={post.title}
              secondary={new Date(post.date).toLocaleDateString()}
            />
          </ListItem>
        ))}
      </List>
      <Pagination
        className="align-self-center my-4"
        count={totalPages}
        page={page}
        onChange={(_e, value) => setPage(value)}
      />
    </div>
  );
}
