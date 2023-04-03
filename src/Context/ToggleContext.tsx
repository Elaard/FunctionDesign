import React, { useRef } from 'react';
import { useContext } from 'react';
import { ToggleItem } from '../Models/SelectedArguments';
import { useKeyPress } from '../Hooks/useKeyPress';
import { useSchemaContext } from './SchemaContext';

interface ToggleContext {
  toggleRef: React.MutableRefObject<ToggleItem>;
}

const ToggleProvider = React.createContext<ToggleContext>({
  toggleRef: {
    current: {}
  },
});

ToggleProvider.displayName = 'ToggleContextProvider';

export function useToggleContext() {
  return useContext(ToggleProvider);
}

interface ToggleContextProps {
  children: JSX.Element;
}

const ToggleContext = ({ children }: ToggleContextProps) => {

  const toggleRef = useRef<ToggleItem>({});

  const { deleteToggled } = useSchemaContext();

  function deleteItems() {
    deleteToggled(toggleRef.current);
  }

  useKeyPress('Delete', deleteItems);

  return <ToggleProvider.Provider
    value={{
      toggleRef,
    }}>
    {children}
  </ToggleProvider.Provider>;
};

export default ToggleContext;