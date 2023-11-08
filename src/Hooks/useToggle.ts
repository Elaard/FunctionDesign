import { useState } from 'react';

export function useToggle(): [toggle: boolean, setToggle: () => void] {
  const [toggleState, setToggleState] = useState(false);

  function setToggle() {
    setToggleState(!toggleState);
  }
  return [toggleState, setToggle];
}
