import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Scheme, SchemeItem } from '../Models/SchemeItem';
import { SchemeUtils } from '../Utils/SchemeUtils';

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
  onChange: (scheme: Scheme) => void;
  children: JSX.Element;
  providedSchema: Scheme;
}

const SchemeContext = ({ children, providedSchema, onChange }: SchemeContextProps) => {
  const [scheme, setScheme] = useState<Scheme>([]);

  useEffect(() => {
    onChange(scheme);
  }, [onChange, scheme]);

  useEffect(() => {
    setScheme(providedSchema);
  }, [providedSchema]);

  function addArgument(value: SchemeItem) {
    setScheme((prev) => [...prev, { ...value, id: Math.random().toString() }]);
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