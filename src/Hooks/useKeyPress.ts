import { useEffect } from 'react';

export function useKeyPress(targetKey: string, action: () => void) {
  function setAction(this: Window, ev: KeyboardEvent) {
    if (ev.key === targetKey) {
      action();
    }
  }
  useEffect(() => {
    window.addEventListener('keydown', setAction);
    return () => {
      window.removeEventListener('keydown', setAction);
    };
  }, []);
}
