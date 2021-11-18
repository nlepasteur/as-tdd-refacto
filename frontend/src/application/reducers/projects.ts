// types
import type { FetchState } from '@types';
import type { ProjectsAction } from '../actions/projects';

export type Project = {
  icons: {
    image: boolean;
    video: boolean;
    video_clip: boolean;
    model_3d: boolean;
    marmoset: boolean;
    pano: boolean;
  };
  url: string;
  title: string;
  smaller_square_cover_url: string;
  hide_as_adult: boolean;
  id: string;
};

export type ProjectsState = FetchState<Project>;

const initialState = {
  status: 'init',
  error: null,
  data: [] as Project[],
} as const;

const reducer = (
  state: ProjectsState = initialState,
  action: ProjectsAction
): ProjectsState => {
  switch (action.type) {
    case 'GET_PROJECTS_FETCHING':
      return {
        status: 'fetching',
        error: null,
        data: state.data,
      };
    case 'GET_PROJECTS_FAILURE':
      return {
        status: 'failure',
        error: action.payload,
        data: [],
      };
    case 'GET_PROJECTS_SUCCESS':
      return {
        status: 'success',
        error: null,
        data: [...state.data, ...action.payload],
      };
    case 'CLEAR_PROJECTS':
      return {
        status: 'init',
        error: null,
        data: [],
      };
    default:
      return state;
  }
};

export default reducer;
