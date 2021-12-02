// types
import type { RefObject } from 'react';
// hooks
import useEventListener from 'hooks/useEventListener';

const useOnClickOutside = (
  element: RefObject<HTMLElement>,
  handler: (e: MouseEvent) => void
) => {
  useEventListener('mousedown', (e) => {
    if (!element.current || element.current.contains(e.target as Node)) {
      return;
    }

    handler(e as MouseEvent);
  });
};

export default useOnClickOutside;
