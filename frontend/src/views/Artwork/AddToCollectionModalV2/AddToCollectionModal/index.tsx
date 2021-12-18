// types
import type { InjectedProps as AddToCollectionProps } from '../AddToCollection';
// libs
import { forwardRef } from 'react';
// components
import Modal from 'components/Modal';
import AddToCollection from '../AddToCollection';

export type InjectedProps = AddToCollectionProps & {
  closeModal(): void;
};

const AddToCollectionModal = forwardRef<
  gsap.core.Timeline | null,
  InjectedProps
>(({ closeModal, ...props }, timeline) => (
  <Modal
    header="Add project to collection"
    closeModal={closeModal}
    ref={timeline}
  >
    {{
      main: <AddToCollection {...props} />,
    }}
  </Modal>
));

const AddToCollectionDisplayName = 'AddToCollectionModal';

AddToCollectionModal.displayName = AddToCollectionDisplayName;

export default AddToCollectionModal;
