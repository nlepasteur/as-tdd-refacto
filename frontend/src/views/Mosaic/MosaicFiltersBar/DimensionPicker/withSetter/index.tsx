// types
import type { ComponentType } from 'react';
import type { Dimension } from 'application/types';
import type { InjectedProps as PropsFromWithMappedStore } from '../withMappedStoreV2';
// utils
// import updateLocalStorage from 'utils/updateLocalStorage';
import createExploreDimensionPathname from 'utils/createExploreDimensionPathname';

export type InjectedProps = Omit<
  PropsFromWithMappedStore,
  'currentExplore' | 'navigate' | 'clearProjects' | 'resetPage'
> & {
  handleDimensionClick(dimension: Dimension): void;
};

const withSetter = (UnwrappedComponent: ComponentType<InjectedProps>) => {
  function WithSetter({
    currentExplore,
    navigate,
    resetPage,
    clearProjects,
    ...props
  }: PropsFromWithMappedStore) {
    const handleDimensionClick: InjectedProps['handleDimensionClick'] = (
      dimension
    ) => {
      clearProjects();
      resetPage();
      navigate(
        createExploreDimensionPathname({ explore: currentExplore, dimension })
      );
    };
    return (
      <UnwrappedComponent
        {...props}
        handleDimensionClick={handleDimensionClick}
      />
    );
  }
  return WithSetter;
};

export default withSetter;
