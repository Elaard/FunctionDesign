export interface SchemeItem {
  id: string;
  name: string;
  value: any;
  type: string;
  parentId: string | null;
  returnType: string;
}

export type Scheme = SchemeItem[];
