import { Box, Paper, Typography } from '@mui/material';
import useImages from '../../hooks/useImages';
import type { CodeContentBlock } from '../../models/CodeContentBlock';
import type { ContentBlock, ImageContentBlock } from '../../models/ContentBlock';

export default function PostContentBlock(props: Readonly<PostContentBlockProps>) {
  const { localImage } = useImages();
  const hasSpacers = !!props.block.content?.includes('\n\n');

  const showBlockType = () => {
    switch (props.block.type) {
      case 'paragraph':
        return hasSpacers ? (
          <pre>{props.block.content}</pre>
        ) : (
          <p>{props.block.content}</p>
        );
      case 'image':
        const imgContent = props.block as ImageContentBlock;
        return (
          <Box
            component="img"
            src={localImage(imgContent.url)}
            alt={imgContent.alt}
            className="py-4"
            sx={{
              borderRadius: 2,
              display: 'block',
              objectFit: 'contain',
              width: '100%',
              maxWidth: {
                xs: '100%',
                sm: '100%',
                md: 600,
                lg: 500
              },
              maxHeight: {
                xs: '100%',
                sm: '100%',
                md: 400,
                lg: 400
              },
              margin: 'auto',
              boxShadow: 'inherit'
            }}
          />
        );
      case 'code':
        return (
          <div className="py-4">
            <Paper
              component="div"
              elevation={0}
              className="p-2 border rounded border-1 border-info"
            >
              <Typography
                component="pre"
                color="primary"
                sx={{
                  fontFamily: 'monospace'
                }}
              >
                {props.block.content}
              </Typography>
            </Paper>
            <Typography variant="overline">
              {(props.block as CodeContentBlock).language}
            </Typography>
          </div>
        );
      default:
        return <>{props.block.content}</>;
    }
  };

  return <>{showBlockType()}</>;
}
interface PostContentBlockProps {
  block: ContentBlock;
}
