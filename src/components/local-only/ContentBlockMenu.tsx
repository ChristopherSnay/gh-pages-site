import { Button, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { BLOCK_TYPES } from '../../constants/blockTypes.const';
import type { ContentBlock } from '../../models/ContentBlock';

export default function ContentBlockMenu(props: Readonly<ContentBlockCreatorProps>) {
  const [showBlockTypeDialog, setShowBlockTypeDialog] = useState<any | null>(null);

  const handleDialogClose = () => {
    setShowBlockTypeDialog(false);
  };

  return (
    <div>
      <Button onClick={(e) => setShowBlockTypeDialog(e.currentTarget)}>
        New Content Block
      </Button>
      <Menu
        open={!!showBlockTypeDialog}
        anchorEl={showBlockTypeDialog}
        onClose={handleDialogClose}
      >
        {Object.entries(BLOCK_TYPES).map(([key]) => (
          <MenuItem
            key={key}
            value={key}
            onClick={() => {
              props.onBlockAdd(
                BLOCK_TYPES[key as keyof typeof BLOCK_TYPES] as ContentBlock['type']
              );
              handleDialogClose();
            }}
          >
            {BLOCK_TYPES[key as keyof typeof BLOCK_TYPES]}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export interface ContentBlockCreatorProps {
  onBlockAdd: (blockType: ContentBlock['type']) => void;
}
