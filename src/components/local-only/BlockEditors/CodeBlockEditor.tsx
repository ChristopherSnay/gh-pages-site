import { TextField } from '@mui/material';
import { useRef } from 'react';
import type { CodeContentBlock } from '../../../models/CodeContentBlock';

export default function CodeBlockEditor(props: Readonly<CodeBlockEditorProps>) {
  /** Allow tabs in the textarea and restore cursor position */

  const textFieldRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!e.shiftKey && e.key === 'Tab') {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const { selectionStart, selectionEnd } = target;
      const tab = '\t';
      const newText =
        target.value.substring(0, selectionStart ?? 0) +
        tab +
        target.value.substring(selectionEnd ?? 0);
      handleFieldChange(newText);
      // Restore cursor position after tab
      setTimeout(() => {
        const cursorPos = (selectionStart ?? 0) + tab.length;
        if (textFieldRef.current) {
          textFieldRef.current.selectionStart = textFieldRef.current.selectionEnd =
            cursorPos;
        }
      }, 0);
    }
  };

  const handleFieldChange = (value: string) => {
    props.onChange({ ...props.block, content: value });
  };

  return (
    <div className="row g-3">
      <div className="col-12">
        <TextField
          label="language"
          value={props.block.language}
          onChange={(e) => {
            props.onChange({ ...props.block, language: e.target.value });
          }}
        />
      </div>
      <div className="col-12">
        <TextField
          fullWidth
          label="code"
          multiline
          minRows={3}
          value={props.block.content}
          sx={{
            '& .MuiInputBase-input': {
              fontFamily: 'monospace',
              fontSize: '1rem'
            }
          }}
          inputRef={textFieldRef}
          onChange={(e) => {
            handleFieldChange(e.target.value);
          }}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}

interface CodeBlockEditorProps {
  block: CodeContentBlock;
  onChange: (block: CodeContentBlock) => void;
}
