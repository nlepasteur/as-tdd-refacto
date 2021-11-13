// types
import type { ComponentType } from 'react';
import type { Explore } from 'application/types';
import { InjectedProps as PropsFromWithMappedStore } from '../withMappedStore';

export type InjectedProps = Omit<
  PropsFromWithMappedStore,
  'setExplore' | 'dimension' | 'location' | 'navigate'
> & {
  handleClick(explore: Explore): void;
};

const withHandleClick = (UnwrappedComponent: ComponentType<InjectedProps>) => {
  function WithHandleClick({
    setExplore,
    location,
    navigate,
    ...props
  }: PropsFromWithMappedStore) {
    const handleClick: InjectedProps['handleClick'] = (explore) => {
      setExplore(explore);
    };
    return <UnwrappedComponent handleClick={handleClick} {...props} />;
  }
  const wrappedComponentName =
    UnwrappedComponent.displayName || UnwrappedComponent.name || 'Component';
  WithHandleClick.displayName = `withMappedStore(${wrappedComponentName})`;
  return WithHandleClick;
};

export default withHandleClick;
