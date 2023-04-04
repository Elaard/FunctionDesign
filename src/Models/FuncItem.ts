import { SimpleItem } from './SimpleItem';

export interface FuncItemMetaSchemeArg {
  type: string;
}

export interface FuncItemMetaScheme {
  arguments: FuncItemMetaSchemeArg[];
  hasStrictScheme: boolean;
}

export interface FuncItemMeta {
  scheme: FuncItemMetaScheme;
}

export interface FuncItem extends SimpleItem {
  meta: FuncItemMeta;
}
