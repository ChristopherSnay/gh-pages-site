import type { BLOCK_TYPES } from '../constants/blockTypes.const';

export interface ContentBlockData {
  type: (typeof BLOCK_TYPES)[keyof typeof BLOCK_TYPES];
  content: string;
}
