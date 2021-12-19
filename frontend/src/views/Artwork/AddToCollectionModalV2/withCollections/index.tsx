// types
import type { ComponentType } from 'react';
import type { AppDispatch, PopUpError } from 'application/types';
import type { FetchState, GenericFetchAction, Collection } from '@types';
import type { InjectedProps as WithSettersProps } from '../withSetters';
// libs
import { useReducer, useEffect } from 'react';
import { connect } from 'react-redux';
// action creators
import { addPopUpError } from 'application/actions/popUpErrors';

const mapDispatch = (dispatch: AppDispatch) => ({
  addPopUpError: (popUpError: PopUpError) => {
    dispatch(addPopUpError(popUpError));
  },
});

export const connector = connect(null, mapDispatch);

type PropsFromRedux = ReturnType<typeof mapDispatch>;

type InjectedProps = Pick<
  WithSettersProps,
  'project' | 'updateProjectCollections'
> &
  PropsFromRedux;

const initialState = {
  status: 'init' as const,
  error: null,
  data: [],
};

const reducer = (
  state: FetchState<Collection>,
  action: GenericFetchAction<Collection>
): FetchState<Collection> => {
  switch (action.type) {
    case 'FETCHING':
      return { ...state, status: 'fetching' };
    case 'FAILURE':
      return {
        ...state,
        status: 'failure',
        error: action.payload,
      };
    case 'SUCCESS':
      return { ...state, status: 'success', data: action.payload };
    default:
      return state;
  }
};

const withCollections = (
  UnwrappedComponent: ComponentType<WithSettersProps>
) => {
  const WithCollections = (props: InjectedProps) => {
    const [{ data: collections, status }, dispatch] = useReducer(
      reducer,
      initialState
    );
    useEffect(() => {
      (async function () {
        try {
          dispatch({ type: 'FETCHING' });
          const response = await fetch('/collections');
          const collections = await response.json();
          dispatch({ type: 'SUCCESS', payload: collections });
        } catch (e) {
          // handle errors
        }
      })();
    }, []);
    return (
      <UnwrappedComponent
        {...props}
        status={status}
        collections={collections}
      />
    );
  };
  return WithCollections;
};

export default withCollections;
