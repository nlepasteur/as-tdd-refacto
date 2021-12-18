// types
import type { ComponentType } from 'react';
import type { InjectedProps as AddToCollectionModalProps } from '../AddToCollectionModal';
import type { Collection } from '@types';
import type { PopUpError } from 'application/types';
// libs
import { useContext, useCallback, createRef } from 'react';
import { nanoid } from 'nanoid';
// context
import { ProjectContext } from '../../ProjectContextProvider';
// action creators
import { toggleAddToCollectionModal } from '../../ProjectContextProvider';

export type InjectedProps = Pick<
  AddToCollectionModalProps,
  'collections' | 'project'
> & {
  addPopUpError(arg: { message: string; id: string }): void;
  updateProjectCollections(collection: Collection): void;
};

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
      if (!response.ok) {
        console.log('collection (response.json(): ', collection);
        throw collection as Omit<PopUpError, 'id'>;
      }
      successCallback(collection as Collection);
      // inclut:
      // updateProjectCollections(collection)
      // toggleModal();
    } catch (e) {
      console.log('directly in catch', e);
      if (hasMessagePropertie(e)) {
        console.log('has a message property');
        failureCallback({ message: 'erreur!' });
        // inclut addPopUpError
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
      successCallback(collection as Collection);
      // inclut:
      // updateProjectCollections(collection)
      // toggleModal();

      //   successCallback({
      //     name: 'ma superbe nouvelle collection',
      //     id: 'iri',
      //     is_private: false,
      //     projects_count: 1,
      //     active_projects_count: 1,
      //     small_square_image_url: '',
      //     micro_square_image_url: '',
      //     user_id: 'userId',
      //   });
    } catch (e) {
      if (hasMessagePropertie(e)) {
        failureCallback(e);
        // addPopUpError
      }
      // handle errors
    }
  };

const withSetters = (
  UnwrappedComponent: ComponentType<AddToCollectionModalProps>
) => {
  const WithSetters = ({
    addPopUpError,
    updateProjectCollections,
    ...props
  }: InjectedProps) => {
    const { dispatch } = useContext(ProjectContext); // dispatch uniquement pour modal PAS POUR updateProjectCollections, venant de props directement puisque subtree
    const timeline = createRef<gsap.core.Timeline | null>();
    const toggleModal = useCallback(() => {
      dispatch(toggleAddToCollectionModal());
    }, [dispatch]);

    const closeModal = useCallback(() => {
      if (
        timeline instanceof Object &&
        'current' in timeline &&
        timeline.current
      ) {
        timeline.current.reverse().then(() => toggleModal());
      }
    }, [timeline, toggleModal]);

    const successCallback = useCallback(
      (collection: Collection) => {
        updateProjectCollections(collection); // doit embarquer dispatch au moment où reçu / passé
        closeModal();
      },
      [closeModal, updateProjectCollections]
    );

    const failureCallback = useCallback(
      (arg: Pick<PopUpError, 'message'>) => {
        addPopUpError({ ...arg, id: nanoid() });
      },
      [addPopUpError]
    );

    const memoizedAddToCollection = useCallback(
      (arg: { project_id: string; collection_id: string }) => {
        const addToCollectionWithCallbacks = addToCollection(
          failureCallback,
          successCallback
        );
        return addToCollectionWithCallbacks(arg);
      },
      [failureCallback, successCallback]
    );

    const memoizedCreateCollection = useCallback(
      (arg: { name: string; project_id: string }) => {
        const createCollectionWithCallbacks = createCollection(
          failureCallback,
          successCallback
        );
        return createCollectionWithCallbacks(arg);
      },
      [failureCallback, successCallback]
    );

    return (
      <UnwrappedComponent
        closeModal={closeModal}
        createCollection={memoizedCreateCollection}
        addToCollection={memoizedAddToCollection}
        {...props}
      />
    );
  };

  return WithSetters;
};

export default withSetters;
