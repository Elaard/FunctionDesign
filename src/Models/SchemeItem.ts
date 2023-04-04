import { SimpleItem } from './SimpleItem';

export interface SchemeItem extends SimpleItem {
  argId: string;
  parentId: string | null;
}

export type Scheme = SchemeItem[];
