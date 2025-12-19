import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { useMemo } from 'react';
import useImages from '../hooks/useImages';
import type { Post } from '../models/Post';
import { getRandomHue } from '../utils/imageFilter';
import { localDate } from '../utils/localDate';

export default function PostCard(props: Readonly<PostCardProps>) {
  const { localImage } = useImages();

  const hasImage = useMemo<boolean>(() => {
    return !!props.post.cover && props.post.cover.length > 0;
  }, [props.post.cover]);

  return (
    <Card className="border border-1 border-dark">
      <CardActionArea onClick={() => props.onPostClick(props.post.filename)}>
        <CardMedia
          component="img"
          height="194"
          alt={props.post.title}
          image={localImage(props.post.cover)}
          style={
            hasImage
              ? {}
              : {
                  filter: `hue-rotate(${getRandomHue(
                    props.post.filename,
                    props.post.title
                  )})`
                }
          }
        />

        <CardContent>
          <Typography variant="h5" className="">
            {props.post.title}
          </Typography>
          <div className="d-flex justify-content-between align-items-center mt-2">
            {props.post.tags?.length > 0 && (
              <Typography variant="overline" className="lh-1">
                {props.post.tags?.join(', ').toUpperCase()}
              </Typography>
            )}
            <Typography variant="overline" className="lh-1">
              {localDate(props.post.date)}
            </Typography>
          </div>

          <Typography
            variant="body2"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {props.post.blocks?.[0]?.content}
          </Typography>

          {/* Card Footer */}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

interface PostCardProps {
  post: Post;
  onPostClick: (filename: string) => void;
}
