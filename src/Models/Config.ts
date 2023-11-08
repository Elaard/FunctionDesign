import { ConfigItems } from './ConfigItem';
import { ConfigSources } from './ConfigSource';
import { ValueWidgetType } from './Widget';

interface ConfigSettings {
  sources: ConfigSources;
}

type ConfigWidgets = {
  [key: string]: ValueWidgetType;
  value: ValueWidgetType;
};

type ConfigType = {
  defaultSource: string;
};

type ConfigTypes = {
  [key: string]: ConfigType;
};

export interface Config {
  parts: ConfigItems;
  types?: ConfigTypes;
  widgets: ConfigWidgets;
  settings: ConfigSettings;
}
