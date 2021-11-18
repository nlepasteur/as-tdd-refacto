import type { Project } from '../reducers/projects';

export const setShuffledProjects = (payload: Project[]) =>
  ({
    type: 'SET_SHUFFLED_PROJECTS',
    payload,
  } as const);

export type ShuffledProjectsActions = ReturnType<typeof setShuffledProjects>;
