import { ConfigItem } from './ConfigItem';
import { DragActionType } from './DragActionType';

export interface DragItem {
  item: ConfigItem;
  actionType: DragActionType;
}
