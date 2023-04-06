import { ConfigItems } from './ConfigItems';
import { ConfigSources } from './ConfigSource';
import { SchemeItem } from './SchemeItem';
import { WidgetProps } from './WidgetProps';

interface ConfigSettings {
  sources: ConfigSources;
}

export type Widget = {
  factory: React.FunctionComponent<WidgetProps>;
  formatDisplayedValue: (value: SchemeItem) => string;
};

export type ValueWidgetType = Record<string, Widget>;

type ConfigTypes = {
  [key: string]: ValueWidgetType;
  value: ValueWidgetType;
};

export interface Config {
  types: ConfigTypes;
  parts: ConfigItems;
  settings: ConfigSettings;
}
