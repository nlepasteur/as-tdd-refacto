// types
import type { ComponentType } from 'react';
import type { InjectedProps as AddToCollectionModalProps } from '..';
import type { Collection } from '@types';
import type { PopUpError } from 'application/types';

const hasMessagePropertie = (arg: unknown): arg is { message: string } =>
  arg instanceof Object && 'message' in arg;

const addToCollection =
  (
    failureCallback: (arg: Omit<PopUpError, 'id'>) => void,
    successCallback: (arg: Collection) => void
  ) =>
  async (arg: { project_id: string; collection_id: string }) => {
    try {
      const response = await fetch('/collections/add', {
        method: 'POST',
        body: JSON.stringify(arg),
      });
      const collection = await response.json();
      // ajouter collection à ProjectFetchState
      if (!response.ok) {
        console.log('collection (response.json(): ', collection);
        throw collection as Omit<PopUpError, 'id'>;
      }
      successCallback(collection as Collection);
    } catch (e) {
      console.log('directly in catch', e);
      if (hasMessagePropertie(e)) {
        console.log('has a message property');
        failureCallback({ message: 'erreur!' });
      }
      // handle errors
    }
  };

const createCollection =
  (
    failureCallback: (arg: Omit<PopUpError, 'id'>) => void, // consiste à dispatch dans store message d'erreur, donc définit dans mapDispatch
    successCallback: (arg: Collection) => void
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
      successCallback(collection as Collection);
    } catch (e) {
      if (hasMessagePropertie(e)) {
        failureCallback(e);
      }
      // handle errors
    }
  };

export type OwnProps = {
  failureCallback: (arg: Omit<PopUpError, 'id'>) => void;
  successCallback: (arg: Collection) => void; // dispatch dans state local présent dans withProject (pour mettre à jour les collections dans lesquelles est présent le project)
};

export type InjectedProps = AddToCollectionModalProps;

const withSetters = (UnwrappedComponent: ComponentType<InjectedProps>) => {
  const WithSetters = ({
    failureCallback,
    successCallback,
    ...props
  }: Pick<
    InjectedProps,
    'collections' | 'toggleAddToCollectionModal' | 'project_id' | 'in'
  > &
    OwnProps) => (
    <UnwrappedComponent
      addToCollection={addToCollection(failureCallback, successCallback)}
      createCollection={createCollection(failureCallback, successCallback)}
      {...props}
    />
  );
  return WithSetters;
};

export default withSetters;
