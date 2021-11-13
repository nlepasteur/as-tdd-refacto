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
  handleClick(gridSize: GridSize): void;
};

const withHandleClick = (UnwrappedComponent: ComponentType<InjectedProps>) => {
  function WithHandleClick(props: PropsFromWithUserFavoriteGridSize) {
    const handleClick = (gridSize: GridSize) => {
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
        handleClick={handleClick}
      />
    );
  }
  return WithHandleClick;
};

export default withHandleClick;
