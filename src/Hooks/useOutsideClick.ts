import React, { useEffect, useRef } from 'react';

export function useOutsideClick<T>(action: () => void) {
  const ref = useRef<T>();
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target)) {
        action();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [action, ref]);
  return ref;
}
