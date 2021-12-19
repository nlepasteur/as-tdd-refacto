// types
import type { InjectedProps as LikesProps } from '../Likes';
// libs
import { forwardRef } from 'react';
// components
import Modal from 'components/Modal';
import Likes from '../Likes';

export type InjectedProps = LikesProps & { closeModal(): void };

const LikesModal = forwardRef<gsap.core.Timeline | null, InjectedProps>(
  ({ closeModal, ...props }, timeline) => {
    return (
      <Modal closeModal={closeModal} ref={timeline}>
        {{ main: <Likes {...props} />, header: 'People Who Like This' }}
      </Modal>
    );
  }
);

const LikesModalDisplayName = 'LikesModal';

LikesModal.displayName = LikesModalDisplayName;

export default LikesModal;
