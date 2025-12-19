import type { CodeContentBlockData } from '../../models/CodeContentBlockData';
import type { ContentBlockData } from '../../models/ContentBlockData';
import type { ImageContentBlockData } from '../../models/ImageContentBlockData';
import type { KeyValueBlockData } from '../../models/KeyValueBlockData';
import CodeContentBlock from './ContentBlocks/CodeContentBlock';
import ImageContentBlock from './ContentBlocks/ImageContentBlock';
import KeyValueBlock from './ContentBlocks/KeyValueBlock';
import ParagraphContentBlock from './ContentBlocks/ParagraphContentBlock';

export default function PostContentBlock(props: Readonly<PostContentBlockProps>) {
  const showBlockType = () => {
    switch (props.block.type) {
      case 'paragraph':
        return <ParagraphContentBlock content={props.block.content} />;
      case 'image':
        return <ImageContentBlock data={props.block as ImageContentBlockData} />;
      case 'code':
        return <CodeContentBlock data={props.block as CodeContentBlockData} />;
      case 'keyValue':
        return <KeyValueBlock data={props.block as KeyValueBlockData} />;
      default:
        return <>{props.block.content}</>;
    }
  };

  return <>{showBlockType()}</>;
}
interface PostContentBlockProps {
  block: ContentBlockData;
}
