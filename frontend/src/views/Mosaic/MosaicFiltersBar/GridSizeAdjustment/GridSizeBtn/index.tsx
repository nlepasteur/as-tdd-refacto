// types
import type { ReactNode, ComponentType } from 'react';
import type { Btn } from '@types';
import type { GridSize } from '@application/types';

export type GridSizeBtnProps = Btn & {
  currentGridSize: GridSize;
  btnGridSize: GridSize;
  handleClick(gridSize: GridSize): void;
};

const GridSizeBtn: ComponentType<GridSizeBtnProps> = ({
  children: { title },
  handleClick,
  currentGridSize,
  btnGridSize,
  ...attributes
}) => (
  <button
    onClick={() => handleClick(btnGridSize)}
    {...attributes}
    disabled={currentGridSize === btnGridSize && btnGridSize !== 'default'}
  >
    {title}
  </button>
);

export default GridSizeBtn;
