import { ArrowDropDown, ArrowDropUp, Delete } from '@mui/icons-material';
import { Button, IconButton, TextField } from '@mui/material';
import type { KeyValueBlockData } from '../../../models/KeyValueBlockData';

export default function KeyValueBlockEditor(props: Readonly<KeyValueBlockEditorProps>) {
  const handleAddClick = (): void => {
    const updatedBlock = { ...props.block };
    updatedBlock.items = Array.isArray(updatedBlock.items) ? [...updatedBlock.items] : [];
    updatedBlock.items.push({ key: '', value: '' });
    props.onChange(updatedBlock);
  };

  const handleDeleteClick = (index: number): void => {
    const updatedBlock = { ...props.block };
    updatedBlock.items = Array.isArray(updatedBlock.items) ? [...updatedBlock.items] : [];
    updatedBlock.items.splice(index, 1);
    props.onChange(updatedBlock);
  };

  const handleKeyChange = (index: number, value: string): void => {
    const items = Array.isArray(props.block.items) ? props.block.items : [];
    const updatedItems = items.map((item, i) =>
      i === index ? { ...item, key: value } : item
    );
    props.onChange({ ...props.block, items: updatedItems });
  };

  const handleValueChange = (index: number, value: string): void => {
    const items = Array.isArray(props.block.items) ? props.block.items : [];
    const updatedItems = items.map((item, i) =>
      i === index ? { ...item, value: value } : item
    );
    props.onChange({ ...props.block, items: updatedItems });
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
      <div className="d-flex flex-column">
        {props.block.items?.map((item, index) => (
          <div key={index} className="d-flex mb-2 gap-2 align-items-center">
            <TextField
              type="text"
              value={item.key}
              className="flex-grow-1"
              onChange={(e) => {
                handleKeyChange(index, e.target.value);
              }}
            />
            <TextField
              type="text"
              value={item.value}
              className="flex-grow-1"
              onChange={(e) => {
                handleValueChange(index, e.target.value);
              }}
            />
            <IconButton
              disabled={index === props.block.items.length - 1}
              onClick={() => handleMoveDownClick(index)}
            >
              <ArrowDropDown />
            </IconButton>
            <IconButton disabled={index === 0} onClick={() => handleMoveUpClick(index)}>
              <ArrowDropUp />
            </IconButton>
            <IconButton onClick={() => handleDeleteClick(index)}>
              <Delete />
            </IconButton>
          </div>
        ))}
      </div>
      <Button onClick={handleAddClick}>Add</Button>
    </>
  );
}

interface KeyValueBlockEditorProps {
  block: KeyValueBlockData;
  onChange: (block: KeyValueBlockData) => void;
}
