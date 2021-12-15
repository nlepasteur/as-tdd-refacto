// types
import type { ComponentType } from 'react';
import type { Collection, FetchState, GenericFetchAction } from '@types';
// import type { InjectedProps as PropsFromWithSetters } from '../../withSetters';
import type {
  InjectedProps as UnwrappedComponentProps,
  OwnProps as WithSettersProps,
} from '../withSetters';
// libs
import { useEffect, useReducer } from 'react';

type InjectedProps = Omit<
  UnwrappedComponentProps,
  // 'createCollection' | 'addToCollection'
  'createCollection' | 'addToCollection'
> &
  WithSettersProps;

const initialState = {
  status: 'init',
  error: null,
  data: [],
} as FetchState<Collection>;

const reducer = (
  state: FetchState<Collection> = initialState,
  action: GenericFetchAction<Collection>
): FetchState<Collection> => {
  switch (action.type) {
    case 'FETCHING':
      return { status: 'fetching', error: null, data: [] };
    case 'FAILURE':
      return { status: 'failure', error: action.payload, data: [] };
    case 'SUCCESS':
      return { status: 'success', error: null, data: action.payload };
    default:
      return state;
  }
};

const withCollections = (
  UnwrappedComponentType: ComponentType<InjectedProps>
) => {
  const WithCollections = (props: Omit<InjectedProps, 'collections'>) => {
    const [{ data: collections }, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
      (async function () {
        try {
          // const response = await fetch('/collections');
          // const collections = await response.json();
          // dispatch({ type: 'SUCCESS', payload: collections as Collection[] });
          dispatch({ type: 'SUCCESS', payload: [makeCollection()] });
        } catch (e) {
          // handle error
        }
      })();
    }, []);

    return <UnwrappedComponentType collections={collections} {...props} />;
  };
  return WithCollections;
};

export default withCollections;

function makeCollection(): Collection {
  return {
    active_projects_count: 1,
    is_private: false,
    micro_square_image_url: '',
    small_square_image_url: '',
    id: 'id',
    name: 'collection name',
    projects_count: 12,
    user_id: 'userId',
  };
}
