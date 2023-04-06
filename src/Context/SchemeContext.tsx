import React, { memo, useEffect, useState } from 'react';
import { useContext } from 'react';
import { Scheme, SchemeItem } from '../Models/SchemeItem';
import { SchemeUtils } from '../Utils/SchemeUtils';
import { ConfigUtils } from '../Utils/ConfigUtils';
import { Config } from '../Models/Config';
import { ConfigItem, FuncItemMeta } from '../Models/ConfigItem';
import { Widget } from '../Models/Widget';

interface SchemeContextUtils {
  addArgument(argument: ConfigItem, parentId: string): void;
  removeArgument(deletedId: string): void;
  replaceArgument(argument: ConfigItem, replacedId: string): void;
  addEmptyArgument(parentId: string, type: string): void;
  updateArgumentValue(value: string, argument: SchemeItem): void;

  getArgumentByArgId(argumentId: string): SchemeItem | undefined;
  getArgumentsByParentId(functionId: string): SchemeItem[];
}

interface ConfigContextUtils {
  isStrict(funcId: string): boolean;
  getWidget(source: string, type: string): Widget;
  getConfigItem(itemId: string, source: string): ConfigItem | undefined;
  getFunctionMeta(funcId: string): FuncItemMeta;
  getTypesBySource(source: string): string[];
  getItemsBySourceAndType(source: string, type: string): ConfigItem[];
}

export interface SchemeContext {
  schemeUtils: SchemeContextUtils;
  configUtils: ConfigContextUtils;
}

const SchemeProvider = React.createContext<SchemeContext>({
  schemeUtils: {
    addArgument: () => null,
    replaceArgument: () => null,
    removeArgument: () => null,
    updateArgumentValue: () => null,
    getArgumentsByParentId: () => [],
    getArgumentByArgId: () => undefined,
    addEmptyArgument: () => null,
  },
  configUtils: {
    isStrict: () => false,
    getWidget: () => undefined as any,
    getConfigItem: () => undefined,
    getFunctionMeta: () => undefined as any,
    getTypesBySource: () => [],
    getItemsBySourceAndType: () => [],
  },
});

SchemeProvider.displayName = 'SchemeContextProvider';

export function useSchemeContext() {
  return useContext(SchemeProvider);
}

interface SchemeContextProps {
  config: Config;
  onChange: (scheme: Scheme) => void;
  children: JSX.Element;
  providedSchema: Scheme;
}

const SchemeContext = ({ children, config, providedSchema, onChange }: SchemeContextProps) => {
  const [scheme, setScheme] = useState<Scheme>([]);

  useEffect(() => {
    onChange(scheme);
  }, [onChange, scheme]);

  useEffect(() => {
    setScheme(providedSchema);
  }, [providedSchema]);

  //SCHEMA
  const schemeUtils: SchemeContextUtils = {
    addArgument: (argument: ConfigItem, parentId: string) => setScheme((prev) => SchemeUtils.addArgument(argument, parentId, prev)),
    removeArgument: (deletedId: string) => setScheme((prev) => SchemeUtils.removeArgument(deletedId, prev)),
    replaceArgument: (argument: ConfigItem, replacedId: string) => setScheme((prev) => SchemeUtils.replaceArgument(argument, replacedId, prev)),
    addEmptyArgument: (parentId: string, type: string) => setScheme((prev) => SchemeUtils.addEmptyArgument(parentId, type, prev)),
    updateArgumentValue: (value: string, argument: SchemeItem) => setScheme((prev) => SchemeUtils.updateArgumentValue(argument, value, prev)),

    getArgumentByArgId: (argumentId: string): SchemeItem | undefined => scheme.find((argument) => argument?.argId === argumentId),
    getArgumentsByParentId: (parentId: string): SchemeItem[] => scheme.filter((arg) => arg?.parentId === parentId),
  };

  //CONFIG
  const configUtils: ConfigContextUtils = {
    isStrict: (funcId: string): boolean => ConfigUtils.isStrict(config, funcId),
    getWidget: (source: string, type: string): Widget => ConfigUtils.getWidget(config, source, type),
    getConfigItem: (itemId: string, source: string) => ConfigUtils.getConfigItem(config, itemId, source),
    getFunctionMeta: (funcId: string) => ConfigUtils.getFunctionMeta(config, funcId),
    getTypesBySource: (source: string): string[] => ConfigUtils.getTypesBySource(config, source),
    getItemsBySourceAndType: (source: string, type: string) => ConfigUtils.getItemsBySourceAndType(config, source, type),
  };

  return (
    <SchemeProvider.Provider
      value={{
        schemeUtils,
        configUtils,
      }}
    >
      {children}
    </SchemeProvider.Provider>
  );
};

export default memo(SchemeContext);
