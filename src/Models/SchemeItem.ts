import { ConfigItem } from './ConfigItem';

export interface SchemeItem extends ConfigItem {
  parentId: string | null;
}

export type Scheme = SchemeItem[];
