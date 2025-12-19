import { Paper, Typography } from '@mui/material';
import type { CodeContentBlockData } from '../../../models/CodeContentBlockData';

export default function CodeContentBlock(props: Readonly<CodeContentBlockProps>) {
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
            fontFamily: 'monospace',
            whiteSpace: 'pre-wrap',
            overflowX: 'auto'
          }}
        >
          {props.data.content}
        </Typography>
      </Paper>
      <Typography variant="overline">{props.data.language}</Typography>
    </div>
  );
}

interface CodeContentBlockProps {
  data: CodeContentBlockData;
}
