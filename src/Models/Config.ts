import { ConfigItems } from './ConfigItems';
import { Sources } from './Source';

interface ConfigSettings {
  sources: Sources;
}

export interface Config {
  parts: ConfigItems;
  settings: ConfigSettings;
}
