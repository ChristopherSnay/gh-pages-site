import { Avatar, Typography } from '@mui/material';

export default function AuthorAvatar(props: Readonly<AuthorAvatarProps>) {
  return (
    <div className="d-flex align-items-center">
      <Avatar variant="square" sx={{ bgcolor: 'primary.main' }}>
        CS
      </Avatar>
      <div className="d-flex flex-column ms-2">
        <Typography variant="body1">Christopher Snay</Typography>
        {props.date && (
          <Typography color="textSecondary" variant="caption">
            {props.date}
          </Typography>
        )}
      </div>
    </div>
  );
}

interface AuthorAvatarProps {
  name?: string;
  date?: string;
}
