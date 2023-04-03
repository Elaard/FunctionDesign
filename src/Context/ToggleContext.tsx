import React, { useState } from 'react';
import { useContext } from 'react';
import { useKeyPress } from '../Hooks/useKeyPress';
import { useSchemaContext } from './SchemaContext';

interface ToggleContext {
  isToggled: (argumentId: string) => boolean;
  toggleElement: (id: string) => void;
}

const ToggleProvider = React.createContext<ToggleContext>({
  isToggled: () => false,
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
  const [toggledId, setToggledId] = useState<string>('');

  const { deleteToggled } = useSchemaContext();

  function deleteItems() {
    deleteToggled(toggledId);
  }

  function toggleElement(argumentId: string) {
    setToggledId(argumentId);
  }

  function isToggled(argumentId: string) {
    return toggledId === argumentId;
  }

  useKeyPress('Delete', deleteItems);

  return <ToggleProvider.Provider
    value={{
      isToggled,
      toggleElement,
    }}>
    {children}
  </ToggleProvider.Provider>;
};

export default ToggleContext;