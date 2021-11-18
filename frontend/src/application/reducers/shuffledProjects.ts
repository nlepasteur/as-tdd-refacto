import type { Project } from '../types';
import type { ShuffledProjectsAction } from '../actions/shuffledProjects';

const reducer = (state: Project[] = [], action: ShuffledProjectsAction) => {
  switch (action.type) {
    case 'SET_SHUFFLED_PROJECTS':
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
