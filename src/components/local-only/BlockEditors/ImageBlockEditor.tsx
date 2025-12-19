import { TextField } from '@mui/material';
import type { ImageContentBlockData } from '../../../models/ImageContentBlockData';

export default function ImageBlockEditor(props: Readonly<ImageBlockEditorProps>) {
  return (
    <div className="row g-3">
      <div className="col-12 col-md-6">
        <TextField
          fullWidth
          label="url"
          value={props.block.url}
          onChange={(e) => {
            props.onChange({ ...props.block, url: e.target.value });
          }}
        />
      </div>
      <div className="col-12 col-md-6">
        <TextField
          fullWidth
          label="alt text"
          value={props.block.alt || ''}
          onChange={(e) => {
            props.onChange({ ...props.block, alt: e.target.value });
          }}
        />
      </div>
      <div className="col-12 col-md-6">
        <TextField
          fullWidth
          label="caption"
          value={props.block.caption || ''}
          onChange={(e) => {
            props.onChange({ ...props.block, caption: e.target.value });
          }}
        />
      </div>
    </div>
  );
}

interface ImageBlockEditorProps {
  block: ImageContentBlockData;
  onChange: (block: ImageContentBlockData) => void;
}
