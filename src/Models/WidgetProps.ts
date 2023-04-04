import { ConnectDropTarget } from 'react-dnd';
import { SchemeItem } from './SchemeItem';
import { ConfigItem } from './ConfigItems';

export interface WidgetProps {
  value: SchemeItem;
  items: ConfigItem[];
  onChange: (value: string | number | boolean) => void;
}

export interface WidgetPropsWithDrop {
  dropRef: ConnectDropTarget;
  setValue: (updated: Partial<ConfigItem>) => void;
  renderWidget: (onChange: (value: string | number | boolean) => void) => JSX.Element;
  argument: SchemeItem;
}
