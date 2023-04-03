import React, { useState } from 'react';
import { useContext } from 'react';
import { useKeyPress } from '../Hooks/useKeyPress';
import { useSchemeContext } from './SchemeContext';

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

  const { removeArgument } = useSchemeContext();

  function deleteItems() {
    removeArgument(toggledId);
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