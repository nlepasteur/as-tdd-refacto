// types
import type { RefObject } from 'react';
// libs
import { useEffect } from 'react';

function useEventListener<T extends HTMLElement = HTMLElement>(
  eventName: keyof WindowEventMap | string,
  handler: (event: Event) => void,
  element?: RefObject<T>
) {
  useEffect(() => {
    const targetElement: T | Window = element?.current || window;
    if (!(targetElement && targetElement.addEventListener)) {
      // vérifier !targetElement dans le cas où élément n'est toujours pas rendu après initial render (par exemple dans le cas d'une requête dont dépent élément auquel attacher event)
      // vérifier !targetElement.addEventListener dans le cas d'éléments qui n'acceptent pas d'event listener?
      return;
    }

    const eventListener = (e: Event) => {
      handler(e);
    };

    targetElement.addEventListener(eventName, eventListener);

    return () => {
      targetElement.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element, handler]);
}

export default useEventListener;
