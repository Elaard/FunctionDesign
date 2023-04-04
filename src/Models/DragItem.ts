import { FieldItem } from './FieldItem';
import { DragActionType } from './DragActionType';
import { FuncItem } from './FuncItem';
import { SimpleItem } from './SimpleItem';

export interface DragItem {
  item: SimpleItem | FieldItem | FuncItem;
  actionType: DragActionType;
}
