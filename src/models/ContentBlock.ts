export interface ContentBlock {
  type: 'paragraph' | 'image' | 'code' | 'heading' | 'list';
  content: string;
}
