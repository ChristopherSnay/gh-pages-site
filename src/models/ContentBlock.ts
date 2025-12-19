export interface ContentBlock {
  type: 'paragraph' | 'image' | 'code' | 'heading' | 'list';
  content: string;
}

export interface ImageContentBlock extends ContentBlock {
  url: string;
  alt: string;
}
