import type { ContentBlockData } from './ContentBlockData';

export interface KeyValueBlockData extends ContentBlockData {
  items: { key: string; value: string }[];
}
