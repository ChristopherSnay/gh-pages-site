import { Button, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { BLOCK_TYPES } from '../../constants/blockTypes.const';
import type { ContentBlockData } from '../../models/ContentBlockData';

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
                BLOCK_TYPES[key as keyof typeof BLOCK_TYPES] as ContentBlockData['type']
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
  onBlockAdd: (blockType: ContentBlockData['type']) => void;
}
