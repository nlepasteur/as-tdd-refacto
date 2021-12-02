// types
import type { ComponentType } from 'react';
// libs
import { useState, useEffect } from 'react';
// store hooks
import { useAppDispatch } from 'application/hooks';
// action creators
import { incrementPage } from 'application/actions/page';
// hooks
import useIntersectionObserver from 'hooks/useIntersectionObserver';

type InjectedProps<T extends object> = T & { refCb(ref: HTMLElement): void };

function withInfiniteScroll<T extends object>(
  UnwrappedComponent: ComponentType<InjectedProps<T>>
) {
  function WithInfiniteScroll(props: T) {
    const [ref, setRef] = useState<HTMLElement | null>(null);
    const entry = useIntersectionObserver(ref, { freezeOnceVisible: false });
    const dispatch = useAppDispatch();
    const cb = (ref: HTMLElement) => setRef(ref);

    useEffect(() => {
      if (entry?.isIntersecting) {
        dispatch(incrementPage());
      }
    }, [entry, dispatch]);

    return <UnwrappedComponent refCb={cb} {...props} />;
  }
  return WithInfiniteScroll;
}

export default withInfiniteScroll;
