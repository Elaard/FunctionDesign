import { ConfigItem } from './ConfigItem';
import { SchemeItem } from './SchemeItem';
import { WidgetProps } from './WidgetProps';

export type Widget = {
  factory: React.FunctionComponent<WidgetProps>;
  formatDisplayedValue: (value: SchemeItem, configItem?: ConfigItem) => string;
};

export type ValueWidgetType = Record<string, Widget>;
