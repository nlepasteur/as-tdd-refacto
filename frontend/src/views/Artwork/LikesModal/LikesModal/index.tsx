// types
import type { ComponentType } from 'react';
import type { InjectedProps as LikesProps } from '../Likes';
// libs
import { createRef, useCallback } from 'react';
// components
import Modal from 'components/Modal';
import Likes from '../Likes';

type InjectedProps = LikesProps & { toggleModal(): void };

const LikesModal: ComponentType<InjectedProps> = ({
  toggleModal,
  ...props
}) => {
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
  return (
    <Modal header="People Who Like This" closeModal={closeModal} ref={timeline}>
      {{
        main: <Likes {...props} />,
      }}
    </Modal>
  );
};

export default LikesModal;
