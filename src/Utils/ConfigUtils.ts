import { Config, Widget } from '../Models/Config';
import { FuncItem, FuncItemMeta } from '../Models/FuncItem';
import { SimpleItem } from '../Models/SimpleItem';

export interface ConfigUtils {
  isStrict: (config: Config, funcId: string) => boolean;
  getWidget(config: Config, source: string, type: string): Widget;
  getConfigItem: (config: Config, itemId: string, source: string) => SimpleItem | undefined;
  getFunctionMeta: (config: Config, funcId: string) => FuncItemMeta;
  getTypesBySource(config: Config, source: string): string[];
  getItemsBySourceAndType(config: Config, source: string, type: string): SimpleItem[];
}

const isStrict = (config: Config, funcId: string) => !!(getConfigItem(config, funcId, 'func') as FuncItem)?.meta?.scheme.hasStrictScheme;

function getWidget(config: Config, source: string, type: string): Widget {
  const widget = config.types[source][type];

  if (!widget) {
    throw new Error('no matching widget');
  }

  return widget;
}

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
  getItemsBySourceAndType,
};
