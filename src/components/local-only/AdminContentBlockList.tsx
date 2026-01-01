import { ArrowDropDown, ArrowDropUp, Delete } from '@mui/icons-material';
import { FormGroup, IconButton, Typography } from '@mui/material';
import { BLOCK_TYPES } from '../../constants/blockTypes.const';
import type { CodeContentBlockData } from '../../models/CodeContentBlockData';
import type { ContentBlockData } from '../../models/ContentBlockData';
import type { HyperlinkContentBlockData } from '../../models/HyperlinkContentBlockData';
import type { ImageContentBlockData } from '../../models/ImageContentBlockData';
import type { KeyValueBlockData } from '../../models/KeyValueBlockData';
import type { ListBlockData } from '../../models/ListBlockData';
import CodeBlockEditor from './BlockEditors/CodeBlockEditor';
import HyperlinkBlockEditor from './BlockEditors/HyperlinkBlockEditor';
import ImageBlockEditor from './BlockEditors/ImageBlockEditor';
import KeyValueBlockEditor from './BlockEditors/KeyValueBlockEditor';
import ListBlockEditor from './BlockEditors/ListBlockEditor';
import ParagraphBlockEditor from './BlockEditors/ParagraphBlockEditor';

export default function AdminContentBlockList(props: Readonly<ContentBlockListProps>) {
  if (!props.blocks || props.blocks.length === 0) {
    return null;
  }

  const handleMoveUpClick = (index: number) => {
    if (index === 0) return;
    const updatedBlocks = [...(props.blocks ?? [])];
    const temp = updatedBlocks[index - 1];
    updatedBlocks[index - 1] = updatedBlocks[index];
    updatedBlocks[index] = temp;
    props.onChange(updatedBlocks);
  };

  const handleMoveDownClick = (index: number) => {
    if (index === (props.blocks?.length ?? 0) - 1) return;
    const updatedBlocks = [...(props.blocks ?? [])];
    const temp = updatedBlocks[index + 1];
    updatedBlocks[index + 1] = updatedBlocks[index];
    updatedBlocks[index] = temp;
    props.onChange(updatedBlocks);
  };

  const handleDeleteClick = (index: number) => {
    const updatedBlocks = [...(props.blocks ?? [])];
    updatedBlocks.splice(index, 1);
    props.onChange(updatedBlocks);
  };

  return (
    <div className="d-flex flex-column gap-3">
      {props.blocks.map((block, index) => (
        <FormGroup key={index} className="border rounded p-0">
          <div className="d-flex justify-content-between align-items-center px-3 py-2">
            <div>
              <Typography variant="caption">Content Block</Typography>
              <h3 className="h4 m-0">{block.type}</h3>
            </div>

            <div className="d-flex">
              <IconButton color="primary" onClick={() => handleDeleteClick(index)}>
                <Delete />
              </IconButton>
              <IconButton
                color="primary"
                disabled={index === (props.blocks?.length ?? 0) - 1}
                onClick={() => handleMoveDownClick(index)}
              >
                <ArrowDropDown />
              </IconButton>
              <IconButton
                color="primary"
                disabled={index === 0}
                onClick={() => handleMoveUpClick(index)}
              >
                <ArrowDropUp />
              </IconButton>
            </div>
          </div>

          <hr className="m-0" />

          <div className="p-3">
            {block.type === BLOCK_TYPES.Code && (
              <CodeBlockEditor
                block={block as CodeContentBlockData}
                onChange={(updatedBlock) => {
                  const updatedBlocks = [...(props.blocks ?? [])];
                  updatedBlocks[index] = updatedBlock;
                  props.onChange(updatedBlocks);
                }}
              />
            )}
            {block.type === BLOCK_TYPES.Hyperlink && (
              <HyperlinkBlockEditor
                block={block as HyperlinkContentBlockData}
                onChange={(updatedBlock) => {
                  const updatedBlocks = [...(props.blocks ?? [])];
                  updatedBlocks[index] = updatedBlock;
                  props.onChange(updatedBlocks);
                }}
              />
            )}
            {block.type === BLOCK_TYPES.Image && (
              <ImageBlockEditor
                block={block as ImageContentBlockData}
                onChange={(updatedBlock) => {
                  const updatedBlocks = [...(props.blocks ?? [])];
                  updatedBlocks[index] = updatedBlock;
                  props.onChange(updatedBlocks);
                }}
              />
            )}
            {block.type === BLOCK_TYPES.KeyValue && (
              <KeyValueBlockEditor
                block={block as KeyValueBlockData}
                onChange={(updatedBlock) => {
                  const updatedBlocks = [...(props.blocks ?? [])];
                  updatedBlocks[index] = updatedBlock;
                  props.onChange(updatedBlocks);
                }}
              />
            )}
            {block.type === BLOCK_TYPES.List && (
              <ListBlockEditor
                block={block as ListBlockData}
                onChange={(updatedBlock) => {
                  const updatedBlocks = [...(props.blocks ?? [])];
                  updatedBlocks[index] = updatedBlock;
                  props.onChange(updatedBlocks);
                }}
              />
            )}
            {block.type === BLOCK_TYPES.Paragraph && (
              <ParagraphBlockEditor
                value={(block as ContentBlockData).content}
                onChange={(value) => {
                  const updatedBlocks = [...(props.blocks ?? [])];
                  updatedBlocks[index] = { ...block, content: value };
                  props.onChange(updatedBlocks);
                }}
              />
            )}
          </div>
        </FormGroup>
      ))}
    </div>
  );
}

export interface ContentBlockListProps {
  blocks?: ContentBlockData[];
  onChange: (blocks: ContentBlockData[]) => void;
}
