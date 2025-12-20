import { TextField } from '@mui/material';
import type { HyperlinkContentBlockData } from '../../../models/HyperlinkContentBlockData';

export default function HyperlinkBlockEditor(props: Readonly<HyperlinkBlockEditorProps>) {
  return (
    <div className="d-flex gap-3">
      <TextField
        label="Text"
        value={props.block.content}
        onChange={(e) => props.onChange({ ...props.block, content: e.target.value })}
      />
      <TextField
        label="URL"
        fullWidth
        value={props.block.url}
        onChange={(e) => props.onChange({ ...props.block, url: e.target.value })}
      />
    </div>
  );
}

interface HyperlinkBlockEditorProps {
  block: HyperlinkContentBlockData;
  onChange: (updatedBlock: HyperlinkContentBlockData) => void;
}
