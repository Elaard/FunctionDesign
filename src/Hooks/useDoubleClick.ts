import { SyntheticEvent, useCallback, useRef } from 'react';

export const useDoubleClick = (onDoubleClick: () => void) => {
  const clickTimeout = useRef<any>();

  const clearClickTimeout = () => {
    if (clickTimeout) {
      clearTimeout(clickTimeout.current);
      clickTimeout.current = undefined;
    }
  };

  return useCallback(
    (event: SyntheticEvent) => {
      clearClickTimeout();
      if (event.detail % 2 === 0) {
        onDoubleClick();
      }
    },
    [onDoubleClick],
  );
};
