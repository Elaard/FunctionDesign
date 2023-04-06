import { ConnectDropTarget } from 'react-dnd';
import { SchemeItem } from './SchemeItem';
import { ConfigItem } from './ConfigItems';
import { DragItem } from './DragItem';
import { NullableString } from './BuiltIn';

export interface ValueWidgetProps {
  value: string;
  onChange: (value: string) => void;
  renderWidget: (value: string, onChange: (value: string) => void) => JSX.Element;
}

export interface WidgetProps {
  value: NullableString;
  onChange: (value: string) => void;
  items?: ConfigItem[];
}

export interface WidgetPropsWithDrop {
  argument: SchemeItem;
  acceptedDropTypes: string[];
  canDrop?: (draggItem: DragItem) => boolean;
}
