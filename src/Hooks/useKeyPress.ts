import { useEffect } from 'react';

export function useKeyPress(targetKey: string, action: () => void) {
  useEffect(() => {
    function setAction(this: Window, ev: KeyboardEvent) {
      if (ev.key === targetKey) {
        action();
      }
    }
    window.addEventListener('keydown', setAction);
    return () => {
      window.removeEventListener('keydown', setAction);
    };
  }, [action, targetKey]);
}
