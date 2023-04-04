import { FieldItem } from './FieldItem';
import { FuncItem } from './FuncItem';
import { SimpleItem } from './SimpleItem';

export type ConfigItem = SimpleItem | FuncItem | FieldItem;

export type ConfigItems = Record<string, SimpleItem[] | FuncItem[] | FieldItem[]> & {
  func: FuncItem[];
  field: FieldItem[];
};
