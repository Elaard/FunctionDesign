import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Scheme, SchemeItem } from '../Models/SchemeItem';
import { SchemeUtils } from '../Utils/SchemeUtils';
import { Config } from '../Models/Config';
import { v4 as uuidv4 } from 'uuid';

interface SchemeContext {
  scheme: Scheme,
  addArgument: (value: SchemeItem) => void,
  removeArgument(deletedId: string): void
}

const SchemeProvider = React.createContext<SchemeContext>({
  scheme: [],
  addArgument: () => null,
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

  function addArgument(value: SchemeItem) {
    setScheme((prev) => [...prev, { ...value, id: uuidv4() }]);
  }

  function removeArgument(deletedId: string): void {
    setScheme(SchemeUtils.removeItem(deletedId, scheme));
  }

  return <SchemeProvider.Provider
    value={{
      scheme,
      addArgument,
      removeArgument
    }}>
    {children}
  </SchemeProvider.Provider>;
};

export default SchemeContext;