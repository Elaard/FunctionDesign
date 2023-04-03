import React, { useRef } from 'react';
import { useContext } from 'react';
import { ToggleItem } from '../Models/SelectedArguments';
import { useKeyPress } from '../Hooks/useKeyPress';
import { useSchemaContext } from './SchemaContext';

interface ToggleContext {
  toggleElement: (id: string, value: boolean) => void;
}

const ToggleProvider = React.createContext<ToggleContext>({
  toggleElement: () => null
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

  function toggleElement(argumentId: string, value: boolean) {
    toggleRef.current[argumentId] = value;
  }

  useKeyPress('Delete', deleteItems);

  return <ToggleProvider.Provider
    value={{
      toggleElement,
    }}>
    {children}
  </ToggleProvider.Provider>;
};

export default ToggleContext;