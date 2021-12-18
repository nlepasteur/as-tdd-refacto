// types
import type { ComponentType } from 'react';
import type { FetchState, GenericFetchAction, Collection } from '@types';
import type { InjectedProps as WithSettersProps } from '../withSetters';
// libs
import { useReducer, useEffect } from 'react';

type InjectedProps = Pick<
  WithSettersProps,
  'project' | 'addPopUpError' | 'updateProjectCollections'
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
      return { error: null, status: 'fetching', data: [] };
    case 'FAILURE':
      return {
        status: 'failure',
        error: action.payload,
        data: [],
      };
    case 'SUCCESS':
      return { error: null, status: 'success', data: action.payload };
    default:
      return state;
  }
};

const withCollections = (
  UnwrappedComponent: ComponentType<WithSettersProps>
) => {
  const WithCollections = (props: InjectedProps) => {
    const [{ error, ...rest }, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
      // besoin de préciser id de user, ce qui est fait côté back
      (async function () {
        try {
          const response = await fetch('/collections');
          const collections = await response.json();
        } catch (e) {
          // handle errors
        }
      });
    }, []);
  };
  return WithCollections;
};

export default withCollections;
