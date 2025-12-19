import { ArrowDropDown, ArrowDropUp, Delete } from '@mui/icons-material';
import { FormGroup, FormLabel, IconButton } from '@mui/material';
import { BLOCK_TYPES } from '../../constants/blockTypes.const';
import type { CodeContentBlock } from '../../models/CodeContentBlock';
import type { ContentBlock } from '../../models/ContentBlock';
import type { ImageContentBlock } from '../../models/ImageContentBlock';
import CodeBlockEditor from './BlockEditors/CodeBlockEditor';
import ImageBlockEditor from './BlockEditors/ImageBlockEditor';
import ParagraphBlockEditor from './BlockEditors/ParagraphBlockEditor';

export default function ContentBlockList(props: Readonly<ContentBlockListProps>) {
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

  return props.blocks.map((block, index) => (
    <FormGroup key={index} className="mb-3">
      <div className="d-flex justify-content-between align-items-center">
        <FormLabel component="legend">{block.type}</FormLabel>

        <div className="d-flex">
          <IconButton onClick={() => handleDeleteClick(index)}>
            <Delete />
          </IconButton>
          <IconButton
            onClick={() => handleMoveDownClick(index)}
            disabled={index === (props.blocks?.length ?? 0) - 1}
          >
            <ArrowDropDown />
          </IconButton>
          <IconButton onClick={() => handleMoveUpClick(index)} disabled={index === 0}>
            <ArrowDropUp />
          </IconButton>
        </div>
      </div>
      {block.type === BLOCK_TYPES.Paragraph && (
        <ParagraphBlockEditor
          value={(block as ContentBlock).content}
          onChange={(value) => {
            const updatedBlocks = [...(props.blocks ?? [])];
            updatedBlocks[index] = { ...block, content: value };
            props.onChange(updatedBlocks);
          }}
        />
      )}
      {block.type === BLOCK_TYPES.Image && (
        <ImageBlockEditor
          block={block as ImageContentBlock}
          onChange={(updatedBlock) => {
            const updatedBlocks = [...(props.blocks ?? [])];
            updatedBlocks[index] = updatedBlock;
            props.onChange(updatedBlocks);
          }}
        />
      )}
      {block.type === 'code' && (
        <CodeBlockEditor
          block={block as CodeContentBlock}
          onChange={(updatedBlock) => {
            const updatedBlocks = [...(props.blocks ?? [])];
            updatedBlocks[index] = updatedBlock;
            props.onChange(updatedBlocks);
          }}
        />
      )}
    </FormGroup>
  ));
}

export interface ContentBlockListProps {
  blocks?: ContentBlock[];
  onChange: (blocks: ContentBlock[]) => void;
}
