import type { Explore } from '../reducers/explore';

export const setExplore = (payload: Explore) =>
  ({
    type: 'SET_EXPLORE',
    payload,
  } as const);

export type ExploreAction = ReturnType<typeof setExplore>;
