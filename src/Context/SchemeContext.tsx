import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Scheme, SchemeItem } from '../Models/SchemeItem';
import { SchemeUtils as utils } from '../Utils/SchemeUtils';
import { Config, Widget } from '../Models/Config';
import { ConfigItem } from '../Models/ConfigItems';
import { FuncItem, FuncItemMeta } from '../Models/FuncItem';

interface SchemeContext {
  getWidget(source: string, type: string): Widget;
  addArgument: (argument: ConfigItem, parentId: string) => void;
  replaceArgument: (argument: ConfigItem, replacedId: string) => void;
  removeArgument(deletedId: string): void;
  getItemsByType(source: string, type: string): ConfigItem[];
  updateArgumentValue(value: string, argument: SchemeItem): void;
  getFunctionArguments(functionId: string): SchemeItem[];
  getArgumentByArgId(argumentId: string): SchemeItem | undefined;
  getAllTypes(): string[];
  addEmptyArgument(parentId: string, type: string): void;
  getFunctionSchema(functionId: string): FuncItem | undefined;
  getFunctionMeta(funcId: string): FuncItemMeta;
  getConfigItem(itemId: string, source: string): ConfigItem | undefined;
}

const SchemeProvider = React.createContext<SchemeContext>({
  getWidget: () => null,
  addArgument: () => null,
  replaceArgument: () => null,
  removeArgument: () => null,
  getItemsByType: () => [],
  updateArgumentValue: () => null,
  getFunctionArguments: () => [],
  getArgumentByArgId: () => undefined,
  getAllTypes: () => [],
  addEmptyArgument: () => null,
  getFunctionSchema: () => undefined,
  getConfigItem: () => undefined,
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

  function addArgument(argument: ConfigItem, parentId: string): void {
    setScheme((prev) => utils.addArgument(argument, parentId, prev));
  }

  function removeArgument(deletedId: string): void {
    setScheme((prev) => utils.removeArgument(deletedId, prev));
  }

  function replaceArgument(argument: ConfigItem, replacedId: string): void {
    setScheme((prev) => utils.replaceArgument(argument, replacedId, prev));
  }

  function updateArgumentValue(value: string, argument: SchemeItem) {
    setScheme((prev) => utils.updateArgumentValue(argument, value, prev));
  }

  function getWidget(source: string, type: string): Widget {
    const widget = config.types[source][type];

    if (!widget) {
      throw new Error('no matching widget');
    }

    return widget;
  }

  function getItemsByType(source: string, type: string) {
    return (config.parts[source] ?? []).filter((item) => item.type === type);
  }

  function getFunctionArguments(functionId: string): SchemeItem[] {
    return scheme.filter((arg) => arg?.parentId === functionId);
  }

  function getArgumentByArgId(argumentId: string): SchemeItem | undefined {
    return scheme.find((argument) => argument?.argId === argumentId);
  }

  function getAllTypes(): string[] {
    return [...new Set(config.parts.func.map((x) => x.type))];
  }

  function addEmptyArgument(parentId: string, type: string): void {
    setScheme((prev) => utils.addEmptyArgument(parentId, type, prev));
  }

  function getFunctionSchema(functionId: string) {
    return config.parts.func.find((fn) => fn.id === functionId);
  }

  function getFunctionMeta(funcId: string): FuncItemMeta {
    return config.parts.func.find((item) => item.id === funcId)?.meta as FuncItemMeta;
  }

  function getConfigItem(itemId: string, source: string): ConfigItem | undefined {
    if (source === 'value') {
      return undefined;
    }
    return config.parts[source].find((item) => item.id === itemId);
  }

  return (
    <SchemeProvider.Provider
      value={{
        getWidget,
        addArgument,
        removeArgument,
        updateArgumentValue,
        replaceArgument,
        getItemsByType,
        getFunctionArguments,
        getArgumentByArgId,
        getAllTypes,
        addEmptyArgument,
        getFunctionSchema,
        getFunctionMeta,
        getConfigItem,
      }}
    >
      {children}
    </SchemeProvider.Provider>
  );
};

export default SchemeContext;
