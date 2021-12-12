// types
import type { ComponentType } from 'react';
import type { InjectedProps as PropsFromWithCollections } from '../withCollections';
import type { Collection } from '@types';
import type { PopUpError } from 'application/types';

const hasMessagePropertie = (arg: unknown): arg is { message: string } =>
  arg instanceof Object && 'message' in arg;

const addToCollection =
  (failureCallback: (arg: Omit<PopUpError, 'id'>) => void) =>
  async (arg: { project_id: string; collection_id: string }) => {
    try {
      const response = await fetch('/collections/add', {
        method: 'POST',
        body: JSON.stringify(arg),
      });
      const collection = await response.json();
      if (!response.ok) {
        throw collection as Omit<PopUpError, 'id'>;
      }
    } catch (e) {
      if (hasMessagePropertie(e)) {
        failureCallback(e);
      }
      // handle errors
    }
  };

const createCollectionThenAddToCollection =
  (
    failureCallback: (arg: Omit<PopUpError, 'id'>) => void,
    successCb: (arg: Collection) => void
  ) =>
  async (arg: { project_id: string; name: string }) => {
    try {
      const response = await fetch('/collections', {
        method: 'POST',
        body: JSON.stringify(arg),
      });
      const collection = await response.json();
      if (!response.ok) {
        throw collection as Omit<PopUpError, 'id'>;
      }
      // ajouter collection à ProjectFetchState
    } catch (e) {
      if (hasMessagePropertie(e)) {
        failureCallback(e);
      }
      // handle errros
    }
  };

export type InjectedProps = PropsFromWithCollections & {
  addToCollection: typeof addToCollection;
  createCollectionThenAddToCollection: typeof createCollectionThenAddToCollection;
};

const withSetters = (UnwrappedComponent: ComponentType<InjectedProps>) => {
  const WithSetters = (props: PropsFromWithCollections) => (
    <UnwrappedComponent
      addToCollection={addToCollection}
      createCollectionThenAddToCollection={createCollectionThenAddToCollection}
      {...props}
    />
  );
  return WithSetters;
};

export default withSetters;
