// types
import type { ComponentType } from 'react';
import type { GridSize } from 'application/types';
import type { InjectedProps as PropsFromWithUserFavoriteGridSize } from '../withUserFavoriteGridSize';
// utils
import updateLocalStorage from 'utils/updateLocalStorage';

export type InjectedProps = Omit<
  PropsFromWithUserFavoriteGridSize,
  'adjustGridSize'
> & {
  adjustGridSize(gridSize: GridSize): void;
};

const withSetter = (UnwrappedComponent: ComponentType<InjectedProps>) => {
  function WithSetter(props: PropsFromWithUserFavoriteGridSize) {
    const adjustGridSize = (gridSize: GridSize) => {
      const currentGridSize =
        props.currentGridSize === 'small' || props.currentGridSize === 'large'
          ? 'default'
          : gridSize;
      updateLocalStorage('grid', currentGridSize);
      props.adjustGridSize(currentGridSize);
    };
    return (
      <UnwrappedComponent
        currentGridSize={props.currentGridSize}
        adjustGridSize={adjustGridSize}
      />
    );
  }
  return WithSetter;
};

export default withSetter;
