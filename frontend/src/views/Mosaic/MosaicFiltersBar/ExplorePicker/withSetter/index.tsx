// types
import type { ComponentType } from 'react';
import type { Explore } from 'application/types';
import { InjectedProps as PropsFromWithMappedStore } from '../withMappedStore';
// utils
import updateLocalStorage from 'utils/updateLocalStorage';
import createExploreDimensionPathname from 'utils/createExploreDimensionPathname';

export type InjectedProps = Omit<
  PropsFromWithMappedStore,
  'setExplore' | 'currentDimension' | 'navigate'
> & {
  setExplore(explore: Explore): void;
};

const withSetter = (UnwrappedComponent: ComponentType<InjectedProps>) => {
  function WithSetter({
    navigate,
    currentDimension,
    ...props
  }: PropsFromWithMappedStore) {
    const setExplore: InjectedProps['setExplore'] = (explore) => {
      props.setExplore(explore);
      updateLocalStorage('explore', explore);
      navigate(
        createExploreDimensionPathname({ explore, dimension: currentDimension })
      );
    };
    return <UnwrappedComponent {...props} setExplore={setExplore} />;
  }
  const wrappedComponentName =
    UnwrappedComponent.displayName || UnwrappedComponent.name || 'Component';
  WithSetter.displayName = `withMappedStore(${wrappedComponentName})`;
  return WithSetter;
};

export default withSetter;
