export interface SimpleItem {
  id: string;
  type: string;
  name?: string;
  value?: string;
  source: string;
}

export interface FuncItemMetaSchemeArg {
  type: string;
  source: string;
}

export interface FuncItemMetaScheme {
  arguments: FuncItemMetaSchemeArg[];
  hasStrictScheme: boolean;
}

export interface FuncItemMeta {
  scheme: FuncItemMetaScheme;
}

export interface FuncItem extends SimpleItem {
  meta?: FuncItemMeta;
}

export type FieldItem = SimpleItem;

export type ConfigItem = SimpleItem | FuncItem | FieldItem;

export type ConfigItems = Record<string, ConfigItem[]> & {
  func: FuncItem[];
  field: FieldItem[];
};
