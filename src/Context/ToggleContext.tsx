import React, { memo, useCallback, useState } from 'react';
import { useContext } from 'react';
import { useKeyPress } from '../Hooks/useKeyPress';
import { useSchemeContext } from './SchemeContext';

export interface ToggleContext {
  isToggled: (argumentId: string) => boolean;
  toggleElement: (id: string) => void;
  clearToggled: () => void;
}

const ToggleProvider = React.createContext<ToggleContext>({
  isToggled: () => false,
  toggleElement: () => null,
  clearToggled: () => null,
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

  const { schemeUtils } = useSchemeContext();

  const clearToggled = useCallback(() => setToggledId(''), []);

  const isToggled = useCallback((argumentId: string) => toggledId === argumentId, [toggledId]);

  const toggleElement = useCallback((argumentId: string) => setToggledId(argumentId), []);

  const removeToggled = useCallback(() => {
    if (toggledId) {
      schemeUtils.removeArgument(toggledId);
      clearToggled();
    }
  }, [schemeUtils.removeArgument, clearToggled, toggledId]);

  useKeyPress('Delete', removeToggled);

  return (
    <ToggleProvider.Provider
      value={{
        isToggled,
        clearToggled,
        toggleElement,
      }}
    >
      {children}
    </ToggleProvider.Provider>
  );
};

export default memo(ToggleContext);
