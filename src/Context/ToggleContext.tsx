import React, { useEffect, useRef, useState } from 'react';
import { useContext } from 'react';
import { ToggleItem } from '../Models/SelectedArguments';
import { useKeyPress } from '../Hooks/useKeyPress';

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
  deleteItems: (items: ToggleItem) => void;
}


const ToggleContext = ({ children, deleteItems }: ToggleContextProps) => {

  const toggleRef = useRef<ToggleItem>({});

  useKeyPress('Delete', () => deleteItems(toggleRef.current));

  return <ToggleProvider.Provider
    value={{
      toggleRef,
    }}>
    {children}
  </ToggleProvider.Provider>;
};

export default ToggleContext;