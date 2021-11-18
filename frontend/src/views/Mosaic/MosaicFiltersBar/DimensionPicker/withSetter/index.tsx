// types
import type { ComponentType } from 'react';
import type { Dimension } from 'application/types';
import type { InjectedProps as PropsFromWithMappedStore } from '../withMappedStore';
// utils
import updateLocalStorage from 'utils/updateLocalStorage';
import createExploreDimensionPathname from 'utils/createExploreDimensionPathname';

export type InjectedProps = Pick<
  PropsFromWithMappedStore,
  'currentDimension'
> & {
  setDimension(dimension: Dimension): void;
};

const withSetter = (UnwrappedComponent: ComponentType<InjectedProps>) => {
  function WithSetter({
    currentExplore,
    navigate,
    ...props
  }: PropsFromWithMappedStore) {
    const setDimension: InjectedProps['setDimension'] = (dimension) => {
      props.setDimension(dimension);
      updateLocalStorage('dimension', dimension);
      navigate(
        createExploreDimensionPathname({ explore: currentExplore, dimension })
      );
    };
    return <UnwrappedComponent {...props} setDimension={setDimension} />;
  }
  return WithSetter;
};

export default withSetter;
