import { ConnectDropTarget } from 'react-dnd';
import { SchemeItem } from './SchemeItem';
import { ConfigItem } from './ConfigItems';
import { DragItem } from './DragItem';

export interface SelectWidgetProps {
  items: ConfigItem[];
  argument: SchemeItem;
  onChange: (selected: ConfigItem) => void;
  Widget: React.FunctionComponent<WidgetProps>;
}

export interface ValueWidgetProps {
  value: string;
  onChange: (value: string) => void;
  renderWidget: (value: string, onChange: (value: string) => void) => JSX.Element;
}

export interface WidgetProps {
  value: string;
  onChange: (value: string) => void;
  items?: any[];
}

export interface WidgetPropsWithDrop {
  argument: SchemeItem;
  acceptedDropTypes: string[];
  canDrop?: (draggItem: DragItem) => boolean;
}
