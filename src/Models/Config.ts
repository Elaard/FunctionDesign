import { ConfigItems } from './ConfigItem';
import { ConfigSources } from './ConfigSource';
import { ValueWidgetType } from './Widget';

interface ConfigSettings {
  sources: ConfigSources;
}

type ConfigTypes = {
  [key: string]: ValueWidgetType;
  value: ValueWidgetType;
};

export interface Config {
  types: ConfigTypes;
  parts: ConfigItems;
  settings: ConfigSettings;
}
