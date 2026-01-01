import { ArrowDropDown, ArrowDropUp, Delete } from '@mui/icons-material';
import { Button, IconButton, List, TextField } from '@mui/material';
import type { ListBlockData } from '../../../models/ListBlockData';

export default function ListBlockEditor(props: Readonly<ListBlockEditorProps>) {
  const handleAddClick = (): void => {
    const updatedBlock = { ...props.block };
    updatedBlock.items = Array.isArray(updatedBlock.items) ? [...updatedBlock.items] : [];
    updatedBlock.items.push({ text: '' });
    props.onChange(updatedBlock);
  };

  const handleDeleteClick = (index: number): void => {
    const updatedBlock = { ...props.block };
    updatedBlock.items = Array.isArray(updatedBlock.items) ? [...updatedBlock.items] : [];
    updatedBlock.items.splice(index, 1);
    props.onChange(updatedBlock);
  };

  const handleMoveUpClick = (index: number): void => {
    if (index === 0) return;
    const items = Array.isArray(props.block.items) ? [...props.block.items] : [];
    [items[index - 1], items[index]] = [items[index], items[index - 1]];
    props.onChange({ ...props.block, items });
  };

  const handleMoveDownClick = (index: number): void => {
    if (index === props.block.items.length - 1) return;
    const items = Array.isArray(props.block.items) ? [...props.block.items] : [];
    [items[index], items[index + 1]] = [items[index + 1], items[index]];
    props.onChange({ ...props.block, items });
  };

  return (
    <>
      <List>
        {props.block?.items?.map((item, itemIndex) => (
          <div key={itemIndex} className="d-flex mb-2 gap-2 align-items-center">
            <TextField
              type="text"
              label="Text"
              value={item.text}
              className="flex-grow-1"
              onChange={(e) => {
                const updatedItems = [...props.block.items];
                updatedItems[itemIndex] = {
                  ...updatedItems[itemIndex],
                  text: e.target.value
                };
                props.onChange({ ...props.block, items: updatedItems });
              }}
            />
            <TextField
              type="text"
              label="Subtext"
              value={item.subtext}
              className="flex-grow-1"
              onChange={(e) => {
                const updatedItems = [...props.block.items];
                updatedItems[itemIndex] = {
                  ...updatedItems[itemIndex],
                  subtext: e.target.value
                };
                props.onChange({ ...props.block, items: updatedItems });
              }}
            />
            <TextField
              type="text"
              label="Icon"
              value={item.icon}
              className="flex-grow-1"
              onChange={(e) => {
                const updatedItems = [...props.block.items];
                updatedItems[itemIndex] = {
                  ...updatedItems[itemIndex],
                  icon: e.target.value
                };
                props.onChange({ ...props.block, items: updatedItems });
              }}
            />
            <IconButton
              color="secondary"
              disabled={itemIndex === props.block.items.length - 1}
              onClick={() => handleMoveDownClick(itemIndex)}
            >
              <ArrowDropDown />
            </IconButton>
            <IconButton
              color="secondary"
              disabled={itemIndex === 0}
              onClick={() => handleMoveUpClick(itemIndex)}
            >
              <ArrowDropUp />
            </IconButton>
            <IconButton color="secondary" onClick={() => handleDeleteClick(itemIndex)}>
              <Delete />
            </IconButton>
          </div>
        ))}
      </List>
      <Button color="secondary" onClick={handleAddClick}>
        Add List Item
      </Button>
    </>
  );
}

interface ListBlockEditorProps {
  block: ListBlockData;
  onChange: (block: ListBlockData) => void;
}
