import type { Dimension } from '../reducers/dimension';

export type DimensionAction = {
  type: 'SET_DIMENSION';
  payload: Dimension;
};

export const setDimension = (payload: Dimension) => ({
  type: 'SET_DIMENSION' as const,
  payload,
});
