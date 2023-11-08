import { Config } from '../Models/Config';
import { SimpleItem, FuncItemMeta, FuncItem } from '../Models/ConfigItem';
import { Widget } from '../Models/Widget';

export interface ConfigUtils {
  isStrict: (config: Config, funcId: string) => boolean;
  getWidget(config: Config, source: string, type: string): Widget;
  getConfigItem: (config: Config, itemId: string, source: string) => SimpleItem | undefined;
  getFunctionMeta: (config: Config, funcId: string) => FuncItemMeta;
  getTypesBySource(config: Config, source: string): string[];
  getDefaultSourceByType: (config: Config, type: string) => string;
  getItemsBySourceAndType(config: Config, source: string, type: string): SimpleItem[];
}

const isStrict = (config: Config, funcId: string) => !!(getConfigItem(config, funcId, 'func') as FuncItem)?.meta?.scheme.hasStrictScheme;

function getWidget(config: Config, source: string, type: string): Widget {
  const widget = config.widgets[source][type];

  if (!widget) {
    throw new Error(`You are missing widget for source: ${source}, type: ${type}`);
  }

  return widget;
}

const getDefaultSourceByType = (config: Config, type: string) => {
  const configTypes = config.types;
  let defaultSource = configTypes && configTypes[type]?.defaultSource;
  if (!defaultSource) {
    for (const source in config.widgets) {
      if (!config.widgets[source][type]) {
        defaultSource = source;
        break;
      }
    }
  }
  if (!defaultSource) {
    throw new Error(`You have not provided source for type: ${type}`);
  }
  return defaultSource;
};

const getTypesBySource = (config: Config, source: string): string[] => [...new Set(config.parts[source].map((x) => x.type))];

const getConfigItem = (config: Config, itemId: string, source: string) =>
  source === 'value' ? undefined : config.parts[source].find((item) => item.id === itemId);

const getFunctionMeta = (config: Config, funcId: string) => (getConfigItem(config, 'func', funcId) as FuncItem)?.meta as FuncItemMeta;

const getItemsBySourceAndType = (config: Config, source: string, type: string) => (config.parts[source] ?? []).filter((item) => item.type === type);

export const ConfigUtils: ConfigUtils = {
  isStrict,
  getWidget,
  getConfigItem,
  getFunctionMeta,
  getTypesBySource,
  getDefaultSourceByType,
  getItemsBySourceAndType,
};
