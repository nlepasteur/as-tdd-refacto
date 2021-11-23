// types
import type { ComponentType } from 'react';
import type { Dimension } from 'application/types';
import type { InjectedProps as PropsFromWithMappedStore } from '../withMappedStoreV2';
// utils
// import updateLocalStorage from 'utils/updateLocalStorage';
import createExploreDimensionPathname from 'utils/createExploreDimensionPathname';

export type InjectedProps = Pick<
  PropsFromWithMappedStore,
  'currentDimension'
> & {
  handleDimensionClick(dimension: Dimension): void;
};

const withSetter = (UnwrappedComponent: ComponentType<InjectedProps>) => {
  function WithSetter({
    currentExplore,
    navigate,
    ...props
  }: PropsFromWithMappedStore) {
    const handleDimensionClick: InjectedProps['handleDimensionClick'] = (
      dimension
    ) => {
      props.clearProjects();
      props.resetPage();
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
