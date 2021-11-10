import type { AdjustGridSizeAction } from '../actions/grid';

export type GridSize = 'small' | 'default' | 'large';

const reducer = (state: GridSize = 'default', action: AdjustGridSizeAction) => {
  switch (action.type) {
    case 'ADJUST_GRID_SIZE':
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
