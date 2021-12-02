import type { AnyAction } from 'redux';
import type { ThunkAction } from 'redux-thunk';
import type { RootState, GridSize } from 'application/types';

export const adjustGridSize = (payload: GridSize) =>
  ({
    type: 'ADJUST_GRID_SIZE',
    payload,
  } as const);

export const getUserFavoriteGridSize =
  (): ThunkAction<void, RootState, null, AnyAction> => (dispatch, getState) => {
    try {
      (async function () {
        const response = await fetch('');
        dispatch(adjustGridSize(await response.json()));
      })();
    } catch (error) {
      dispatch(adjustGridSize(getState().grid));
    }
  };

export type AdjustGridSizeAction = ReturnType<typeof adjustGridSize>;
