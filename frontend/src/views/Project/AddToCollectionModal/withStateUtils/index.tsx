// types
import type { ComponentType } from 'react';
import type { FetchState, GenericFetchAction, Collection } from '@types';
import type { InjectedProps as WithSettersProps } from '../withSetters';
// libs
import { useEffect, useReducer } from 'react';

export type InjectedProps = Pick<
  WithSettersProps,
  'toggleModal' | 'updateProjectCollections' | 'project' | 'addPopUpError'
>;

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

const withStateUtils = (
  UnwrappedComponent: ComponentType<WithSettersProps>
) => {
  const WithStateUtils = (props: InjectedProps) => {
    console.log('paaaaaarse');
    const [{ data: collections, status }, dispatch] = useReducer(
      reducer,
      initialState
    );
    useEffect(() => {
      (async function () {
        try {
          dispatch({ type: 'FETCHING' });
          // const response = await fetch('/collections');
          // const collections = await response.json();
          // dispatch({ type: 'SUCCESS', payload: collections });
          dispatch({ type: 'SUCCESS', payload: makeStubCollections() });
        } catch (e) {
          // handle errors
        }
      })();
    }, []);
    return (
      <UnwrappedComponent
        {...props}
        collections={collections}
        status={status}
      />
    );
  };

  return WithStateUtils;
};

export default withStateUtils;

import type { Collection as CollectionType } from '@types';
function makeStubCollections(): CollectionType[] {
  return [
    {
      small_square_image_url: '',
      is_private: true,
      name: 'collection 1',
      id: 'id',
      active_projects_count: 42,
      projects_count: 42,
      micro_square_image_url: '',
      user_id: 'id',
    },
  ];
}