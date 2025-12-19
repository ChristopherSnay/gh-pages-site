import { TextField } from '@mui/material';

export default function ParagraphBlockEditor(props: Readonly<ParagraphBlockEditorProps>) {
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(e.target.value);
  };

  return (
    <div>
      <TextField
        fullWidth
        label="content"
        multiline
        minRows={3}
        value={props.value}
        onChange={handleTextChange}
      />
    </div>
  );
}

interface ParagraphBlockEditorProps {
  value: string;
  onChange: (value: string) => void;
}
