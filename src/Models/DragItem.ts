import { DragActionType } from './DragActionType';
import { ConfigItem } from './ConfigItem';

export interface DragItem {
  item: ConfigItem;
  actionType: DragActionType;
}
