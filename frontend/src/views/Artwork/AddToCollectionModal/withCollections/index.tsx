// types
import type { ComponentType } from 'react';
import type { Collection, FetchState, GenericFetchAction } from '@types';
import type { InjectedProps as PropsFromWithSetters } from '../../withSetters';
// libs
import { useEffect, useReducer } from 'react';

// /!\ AJOUTER COLLECTIONS récupérées depuis fetch de Project afin d'indiquer lorsque
// une collection possède déjà un project
// sachant que si user n'est pas log alors sera sans doute null
export type InjectedProps = { collections: Collection[] } & Pick<
  PropsFromWithSetters,
  'addPopUpError'
> & { projectIsIn: Collection[] | null };

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
  const WithCollections = (
    props: Pick<PropsFromWithSetters, 'addPopUpError'> & {
      projectIsIn: Collection[] | null;
    }
  ) => {
    const [{ data: collections }, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
      (async function () {
        try {
          const response = await fetch('/collections');
          const collections = await response.json();
          dispatch({ type: 'SUCCESS', payload: collections as Collection[] });
        } catch (e) {
          // handle error
        }
      })();
    });

    return <UnwrappedComponentType collections={collections} {...props} />;
  };
  return WithCollections;
};

export default withCollections;
