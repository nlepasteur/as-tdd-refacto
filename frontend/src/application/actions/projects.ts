import { nanoid } from 'nanoid';

const stubProject = {
  icons: {
    image: true,
    video: true,
    video_clip: true,
    model_3d: true,
    marmoset: true,
    pano: true,
  },
  url: '',
  title: '',
  user: {
    medium_avatar_url: '',
    is_organization_owner: true,
    is_plus_member: true,
    is_staff: true,
    pro_member: true,
    full_name: '',
    username: '',
    id: '',
  },
  smaller_square_cover_url: 'https://via.placeholder.com/400',
  hide_as_adult: true,
  id: '',
};

// types
import type { AnyAction } from 'redux';
import type { ThunkAction } from 'redux-thunk';
import type { GetFetching, GetFailure, GetSuccess } from '@types';
import type { RootState, Project } from '../types';
import { setShuffledProjects } from './shuffledProjects';
// libs
import shuffle from 'lodash.shuffle';

export const getProjectsFetching: GetFetching<'projects'> = () => {
  return {
    type: 'GET_PROJECTS_FETCHING',
  };
};

export const getProjectsFailure: GetFailure<'projects'> = (payload: string) => {
  return {
    type: 'GET_PROJECTS_FAILURE',
    payload,
  };
};

export const getProjectsSuccess: GetSuccess<Project, 'projects'> = (
  payload: Project[]
) => {
  return {
    type: 'GET_PROJECTS_SUCCESS',
    payload,
  };
};

export const getProjects =
  (url: string): ThunkAction<void, RootState, null, AnyAction> =>
  (dispatch, getState) => {
    // console.log('url from thunk: ', url);
    const { explore } = getState();
    dispatch(getProjectsFetching());
    // explore === 'community' && dispatch(clearProjects());
    try {
      (async function () {
        // const response = await fetch(`http://localhost:8080${url}`);
        // const data = await response?.json();
        const data = [...Array(100)].map((_, i) => ({
          ...stubProject,
          // id: String(i),
          id: nanoid(),
        }));
        explore === 'community' && dispatch(setShuffledProjects(shuffle(data)));
        dispatch(getProjectsSuccess(data));
      })();
    } catch (error) {
      console.log('error message');
      // dispatch(getProjectsFailure(error.message));
    }
  };

export const clearProjects = () =>
  ({
    type: 'CLEAR_PROJECTS',
  } as const);

export type ProjectsAction =
  | ReturnType<typeof getProjectsSuccess>
  | ReturnType<typeof getProjectsFetching>
  | ReturnType<typeof getProjectsFailure>
  | ReturnType<typeof clearProjects>;
