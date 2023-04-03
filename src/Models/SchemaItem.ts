export interface SchemaItem {
  id: string;
  name: string;
  value: any;
  type: string;
  parentId: string | null;
  returnType: string;
}

export type Schema = SchemaItem[];
