import { FieldItem } from './FieldItem';
import { FuncItem } from './FuncItem';
import { SimpleItem } from './SimpleItem';

export type ConfigItems = Record<string, SimpleItem[] | FuncItem[] | FieldItem[]> & {
  funcs: FuncItem[];
  fields: FieldItem[];
};
