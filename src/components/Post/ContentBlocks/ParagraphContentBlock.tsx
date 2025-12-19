import { Typography } from '@mui/material';

export default function ParagraphContentBlock(
  props: Readonly<ParagraphContentBlockProps>
) {
  const hasSpacers = !!props.content?.includes('\n\n');

  return hasSpacers ? (
    <Typography
      component="pre"
      sx={{
        whiteSpace: 'pre-wrap',
        overflowX: 'auto'
      }}
    >
      {props.content}
    </Typography>
  ) : (
    <p>{props.content}</p>
  );
}

interface ParagraphContentBlockProps {
  content: string;
}
