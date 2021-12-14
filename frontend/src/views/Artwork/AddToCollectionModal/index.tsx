// types
import type { ComponentType } from 'react';
import type { InjectedProps as CreateCollectionProps } from './CreateCollection';
import type { InjectedProps as AddToCollectionListItemsProps } from './AddToCollectionListItems';
// libs
import { useState, createRef, useCallback } from 'react';
// components
import Modal from 'components/Modal';
import Btn from 'components/Btn';
import AddToCollectionListItems from './AddToCollectionListItems';
import CreateCollection from './CreateCollection';

export type InjectedProps = Omit<CreateCollectionProps, 'cancel'> &
  AddToCollectionListItemsProps & {
    toggleAddToCollectionModal(): void;
  };

const AddToCollectionModal: ComponentType<InjectedProps> = ({
  createCollection,
  toggleAddToCollectionModal,
  ...props
}) => {
  // const [showCollectionCreation, toggleCollectionCreation] = useState(false);
  const timeline = createRef<gsap.core.Timeline | null>();
  const handleCloseModal = useCallback(() => {
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
      handleCloseModal={handleCloseModal}
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

function Main({
  toggleAddToCollectionModal,
  createCollection,
  ...props
}: InjectedProps) {
  const [showCollectionCreation, toggleCollectionCreation] = useState(false);
  return (
    <div style={{ color: 'white' }}>
      <Btn
        onClick={() => toggleCollectionCreation(!showCollectionCreation)}
        style={{ color: 'white' }}
      >
        {{
          text: 'Create New Collection',
        }}
      </Btn>
      {!showCollectionCreation ? (
        <AddToCollectionListItems {...props} />
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

export default AddToCollectionModal;
