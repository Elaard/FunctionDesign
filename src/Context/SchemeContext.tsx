import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Scheme, SchemeItem } from '../Models/SchemeItem';
import { SchemeUtils } from '../Utils/SchemeUtils';
import { Config } from '../Models/Config';
import { BasicConfig } from '../Utils/Config';

interface SchemeContext {
  config: Config;
  scheme: Scheme,
  addArgument: (argument: SchemeItem) => void,
  replaceArgument: (argument: SchemeItem, replacedId: string) => void,
  removeArgument(deletedId: string): void
}

const SchemeProvider = React.createContext<SchemeContext>({
  config: { ...BasicConfig },
  scheme: [],
  addArgument: () => null,
  replaceArgument: () => null,
  removeArgument: () => null,
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

  function addArgument(argument: SchemeItem): void {
    setScheme((prev) => SchemeUtils.addArgument(argument, prev));
  }

  function removeArgument(deletedId: string): void {
    setScheme((prev) => SchemeUtils.removeArgument(deletedId, prev));
  }

  function replaceArgument(argument: SchemeItem, replacedId: string): void {
    setScheme((prev) => SchemeUtils.replaceArgument(argument, prev, replacedId));
  }

  console.log(scheme);

  return <SchemeProvider.Provider
    value={{
      config,
      scheme,
      addArgument,
      removeArgument,
      replaceArgument
    }}>
    {children}
  </SchemeProvider.Provider>;
};

export default SchemeContext;