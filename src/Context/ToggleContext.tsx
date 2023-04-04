import React, { useState } from 'react';
import { useContext } from 'react';
import { useKeyPress } from '../Hooks/useKeyPress';
import { useSchemeContext } from './SchemeContext';

interface ToggleContext {
  isToggled: (argumentId: string) => boolean;
  toggleElement: (id: string) => void;
  clearToggled: () => void;
}

const ToggleProvider = React.createContext<ToggleContext>({
  isToggled: () => false,
  toggleElement: () => null,
  clearToggled: () => null
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

  function clearToggled() {
    setToggledId('');
  }

  function toggleElement(argumentId: string) {
    setToggledId(argumentId);
  }

  function isToggled(argumentId: string) {
    return toggledId === argumentId;
  }

  function removeToggled() {
    if (toggledId) {
      removeArgument(toggledId);
      clearToggled();
    }
  }

  useKeyPress('Delete', removeToggled);

  return <ToggleProvider.Provider
    value={{
      isToggled,
      clearToggled,
      toggleElement,
    }}>
    {children}
  </ToggleProvider.Provider>;
};

export default ToggleContext;