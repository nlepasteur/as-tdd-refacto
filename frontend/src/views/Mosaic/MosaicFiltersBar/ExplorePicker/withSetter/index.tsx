// types
import type { ComponentType } from 'react';
import type { Explore } from 'application/types';
import { InjectedProps as PropsFromWithMappedStore } from '../withMappedStore';
// utils
import createExploreDimensionPathname from 'utils/createExploreDimensionPathname';

export type InjectedProps = Pick<
  PropsFromWithMappedStore,
  'currentExplore' | 'isLogged'
> & {
  handleExploreClick(explore: Explore): void;
};

const withSetter = (UnwrappedComponent: ComponentType<InjectedProps>) => {
  function WithSetter({
    navigate,
    currentDimension,
    clearProjects,
    resetPage,
    ...props
  }: PropsFromWithMappedStore) {
    const handleExploreClick: InjectedProps['handleExploreClick'] = (
      explore
    ) => {
      clearProjects();
      resetPage();
      navigate(
        createExploreDimensionPathname({ explore, dimension: currentDimension })
      );
    };
    return (
      <UnwrappedComponent {...props} handleExploreClick={handleExploreClick} />
    );
  }
  const wrappedComponentName =
    UnwrappedComponent.displayName || UnwrappedComponent.name || 'Component';
  WithSetter.displayName = `withMappedStore(${wrappedComponentName})`;
  return WithSetter;
};

export default withSetter;
