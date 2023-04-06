import { ConnectDropTarget } from 'react-dnd';
import { SchemeItem } from './SchemeItem';
import { ConfigItem } from './ConfigItem';
import { DragItem } from './DragItem';

export interface ValueWidgetProps {
  value: string;
  onChange: (value: string) => void;
  renderWidget: (value: string, onChange: (value: string) => void) => JSX.Element;
}

export interface SelectWidgetProps {
  items: ConfigItem[];
  oldValue: string;
  onChange: (selected: ConfigItem) => void;
  renderWidget: (onChange: (value: string) => void, value?: string, items?: ConfigItem[]) => JSX.Element;
  onUseAction: () => void;
}

export interface WidgetProps {
  value?: string;
  onChange: (value: string) => void;
  items?: ConfigItem[];
}
