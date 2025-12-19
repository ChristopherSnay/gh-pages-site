import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function AdminControls() {
  const navigate = useNavigate();
  const handleNewPost = () => {
    navigate('post');
  };

  return (
    <>
      <Button onClick={handleNewPost}>New Post</Button>
    </>
  );
}
