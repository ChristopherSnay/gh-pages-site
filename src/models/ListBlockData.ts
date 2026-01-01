import type { ContentBlockData } from './ContentBlockData';

export interface ListBlockData extends ContentBlockData {
  items: { icon?: string; text: string; subtext?: string }[];
}
