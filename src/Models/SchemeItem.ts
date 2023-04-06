export interface SchemeItem {
  argId: string;
  itemId: string;
  parentId: string;

  type: string;
  value?: string;
  source: string;
}

export type Scheme = SchemeItem[];
