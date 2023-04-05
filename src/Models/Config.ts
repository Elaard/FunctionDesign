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

type ConfigTypes = {
  [key: string]: Widget;
};

export interface Config {
  types: ConfigTypes;
  parts: ConfigItems;
  settings: ConfigSettings;
}
