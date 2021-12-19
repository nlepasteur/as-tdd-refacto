// types
import type { InjectedProps as AddToCollectionProps } from '../AddToCollection';
// libs
import { forwardRef } from 'react';
// components
import Modal from 'components/Modal';
import AddToCollection from '../AddToCollection';

export type InjectedProps = AddToCollectionProps & { closeModal(): void };

const AddToCollectionModal = forwardRef<
  gsap.core.Timeline | null,
  InjectedProps
>(({ closeModal, ...props }, timeline) => (
  <Modal closeModal={closeModal} ref={timeline}>
    {{
      header: 'Add project to collection',
      main: <AddToCollection {...props} />,
    }}
  </Modal>
));

const AddToCollectionModalDisplayName = 'AddToCollectionModal';

AddToCollectionModal.displayName = AddToCollectionModalDisplayName;

export default AddToCollectionModal;
