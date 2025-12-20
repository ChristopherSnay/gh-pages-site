import { Alert, Button, Paper, Slide, Snackbar, Typography } from '@mui/material';
import { useState } from 'react';
import type { CodeContentBlockData } from '../../../models/CodeContentBlockData';

export default function CodeContentBlock(props: Readonly<CodeContentBlockProps>) {
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

  const handleCopyClick = (): void => {
    if (props.data.content) {
      navigator.clipboard.writeText(props.data.content);
      setSnackbarOpen(true);
    }
  };

  return (
    <>
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
      <div className="d-flex justify-content-between align-items-top">
        <Typography variant="overline" color="textDisabled">
          {props.data.language}
        </Typography>
        <Button onClick={handleCopyClick}>Copy</Button>
      </div>
      <Snackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        autoHideDuration={3000}
        slots={{ transition: Slide }}
      >
        <Alert severity="success">Code copied to clipboard</Alert>
      </Snackbar>
    </>
  );
}

interface CodeContentBlockProps {
  data: CodeContentBlockData;
}
