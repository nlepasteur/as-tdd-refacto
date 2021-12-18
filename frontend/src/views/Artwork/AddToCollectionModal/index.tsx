// types
import type { ComponentType } from 'react';
import type { InjectedProps as CreateCollectionProps } from './CreateCollection';
import type { InjectedProps as AddToCollectionListItemsProps } from './AddToCollectionListItems';
// libs
import { useState, createRef, useCallback } from 'react';
// components
import withCollections from './withCollections';
import withSetters from './withSetters';
import Modal from 'components/Modal';
import Btn from 'components/Btn';
import AddToCollectionListItems from './AddToCollectionListItems';
import CreateCollection from './CreateCollection';

export type InjectedProps = Omit<CreateCollectionProps, 'cancel'> &
  Omit<AddToCollectionListItemsProps, 'handleClickCreateNewCollection'> & {
    toggleAddToCollectionModal(): void;
  };

const AddToCollectionModal: ComponentType<InjectedProps> = ({
  createCollection,
  toggleAddToCollectionModal,
  ...props
}) => {
  const timeline = createRef<gsap.core.Timeline | null>();
  const closeModal = useCallback(() => {
    if (
      timeline instanceof Object &&
      'current' in timeline &&
      timeline.current
    ) {
      timeline.current.reverse().then(() => toggleAddToCollectionModal());
    }
  }, [timeline, toggleAddToCollectionModal]);
  return (
    <Modal
      closeModal={closeModal}
      header="Add project to collection"
      ref={timeline}
    >
      {{
        main: (
          <Main
            createCollection={createCollection}
            toggleAddToCollectionModal={toggleAddToCollectionModal}
            {...props}
          />
        ),
      }}
    </Modal>
  );
};

function Main({ createCollection, ...props }: InjectedProps) {
  const [showCollectionCreation, toggleCollectionCreation] = useState(false);
  console.log('showCollectionCreation: :', showCollectionCreation);
  return (
    <div style={{ color: 'white' }}>
      {!showCollectionCreation ? (
        <AddToCollectionListItems
          {...props}
          handleClickCreateNewCollection={() =>
            toggleCollectionCreation(!showCollectionCreation)
          }
        />
      ) : (
        <CreateCollection
          cancel={() => toggleCollectionCreation(!showCollectionCreation)}
          createCollection={createCollection}
          project_id={props.project_id}
        />
      )}
    </div>
  );
}

// export default AddToCollectionModal;
export default withCollections(withSetters(AddToCollectionModal));
