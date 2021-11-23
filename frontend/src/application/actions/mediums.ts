// types
import type { AnyAction } from 'redux';
import type { ThunkAction } from 'redux-thunk';
import type { GetFetching, GetFailure, GetSuccess, FetchAction } from '@types';
import type { RootState, Medium } from '../types';

export const getMediumsFetching: GetFetching<'mediums'> = () => {
  return {
    type: 'GET_MEDIUMS_FETCHING',
  };
};

export const getMediumsFailure: GetFailure<'mediums'> = (payload: string) => {
  return {
    type: 'GET_MEDIUMS_FAILURE',
    payload,
  };
};

export const getMediumsSuccess: GetSuccess<Medium, 'mediums'> = (
  payload: Medium[]
) =>
  ({
    type: 'GET_MEDIUMS_SUCCESS',
    payload,
  } as const);

export const getMediums =
  (): ThunkAction<void, RootState, null, AnyAction> => (dispatch) => {
    dispatch(getMediumsFetching());
    try {
      (async function () {
        // const response = await fetch('http://localhost:8080/mediums');
        // dispatch(getMediumsSuccess(await response?.json()));
        dispatch(
          getMediumsSuccess([
            {
              id: '0',
              name: 'medium1',
              uri: '',
            },
            {
              id: '1',
              name: 'medium2',
              uri: '',
            },
            {
              id: '2',
              name: 'medium3',
              uri: '',
            },
          ])
        );
      })();
    } catch (error) {
      console.log('error: ', error);
      // dispatch(getMediumsFailure(error.message));
    }
  };

export type GetMediums = typeof getMediums;

export const updatePickedMediums = (payload: string) =>
  ({
    type: 'UPDATE_PICKED_MEDIUMS',
    payload,
  } as const);

export const clearPickedMediums = () =>
  ({
    type: 'CLEAR_PICKED_MEDIUMS',
  } as const);

export type MediumsAction =
  | ReturnType<typeof updatePickedMediums>
  | ReturnType<typeof clearPickedMediums>;

export type FetchMediumsAction = FetchAction<Medium, 'mediums'>;
