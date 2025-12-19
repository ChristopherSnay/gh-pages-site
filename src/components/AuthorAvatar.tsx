import { Avatar, Typography } from '@mui/material';

export default function AuthorAvatar(props: Readonly<AuthorAvatarProps>) {
  const stringAvatar = (name: string) => {
    try {
      return {
        children: name ? `${name.split(' ')[0][0]}${name.split(' ')[1][0]}` : '?'
      };
    } catch {
      return {
        children: '?'
      };
    }
  };

  return (
    <div className="d-flex align-items-center">
      <Avatar
        variant="square"
        sx={{ bgcolor: 'primary.main' }}
        {...stringAvatar(props.name ?? '')}
      ></Avatar>
      <div className="d-flex flex-column ms-2">
        <Typography variant="body1">{props.name}</Typography>
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
