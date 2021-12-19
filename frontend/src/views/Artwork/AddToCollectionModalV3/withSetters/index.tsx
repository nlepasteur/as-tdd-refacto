// types
import type { ComponentType } from 'react';
import type { Collection } from '@types';
import type { PopUpError } from 'application/types';
import type { InjectedProps as AddToCollectionModalProps } from '../AddToCollectionModal';
// libs
import { createRef, useCallback } from 'react';
import { nanoid } from 'nanoid';

export type InjectedProps = Omit<
  AddToCollectionModalProps,
  'addToCollection' | 'createCollection' | 'closeModal'
> & {
  addPopUpError(arg: {
    message: string;
    id: string;
    color: 'red' | 'blue';
  }): void;
  updateProjectCollections(collection: Collection): void;
  toggleModal(): void;
};

const hasMessagePropertie = (arg: unknown): arg is { message: string } =>
  arg instanceof Object && 'message' in arg;

const addToCollection =
  (successCallback: (arg: Collection) => void) =>
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
      successCallback(collection as Collection);
    } catch (e) {
      // handle errors
    }
  };

const createCollection =
  (
    failureCallback: (arg: Omit<PopUpError, 'id' | 'color'>) => void,
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
      }
      // handle errors
    }
  };

const withSetters = (
  UnwrappedComponent: ComponentType<AddToCollectionModalProps & { ref: any }>
) => {
  const WithSetters = ({
    addPopUpError,
    updateProjectCollections,
    toggleModal,
    ...props
  }: InjectedProps) => {
    const timeline = createRef<gsap.core.Timeline | null>();
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
        addPopUpError({ ...arg, color: 'blue', id: nanoid() });
      },
      [addPopUpError]
    );

    const memoizedAddToCollection = useCallback(
      (arg: { project_id: string; collection_id: string }) => {
        const addToCollectionWithCallbacks = addToCollection(successCallback);
        return addToCollectionWithCallbacks(arg);
      },
      [successCallback]
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
        ref={timeline}
      />
    );
  };

  return WithSetters;
};

export default withSetters;
