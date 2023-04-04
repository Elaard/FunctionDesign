import { ConfigItems } from './ConfigItems';
import { ConfigSources } from './ConfigSource';
import { WidgetProps } from './WidgetProps';

interface ConfigSettings {
  sources: ConfigSources;
}

type ConfigTypes = {
  [key: string]: React.FunctionComponent<WidgetProps>;
};

export interface Config {
  types: ConfigTypes;
  parts: ConfigItems;
  settings: ConfigSettings;
}
