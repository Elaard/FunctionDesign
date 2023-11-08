import React, { memo, useCallback, useMemo, useState } from 'react';
import { useContext } from 'react';

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

  const clearToggled = useCallback(() => setToggledId(''), []);

  const isToggled = useCallback((argumentId: string) => toggledId === argumentId, [toggledId]);

  const toggleElement = useCallback((argumentId: string) => setToggledId(argumentId), []);

  const value = useMemo(
    () => ({
      isToggled,
      clearToggled,
      toggleElement,
    }),
    [isToggled, clearToggled, toggleElement],
  );

  return <ToggleProvider.Provider value={value}>{children}</ToggleProvider.Provider>;
};

export default ToggleContext;
