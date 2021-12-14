// types
import type { ReactNode } from 'react';
// libs
import { useRef, useLayoutEffect, forwardRef } from 'react';
import gsap from 'gsap';
// hooks
import useOnClickOutside from 'hooks/useOnClickOutside';
// components
import Btn from 'components/Btn';
import { CgClose } from 'react-icons/cg';

type ModalProps = {
  children: {
    main: ReactNode;
  };
  header: string;
  handleCloseModal(): void;
};

const Modal = forwardRef<gsap.core.Timeline | null, ModalProps>(
  ({ children: { main }, header, handleCloseModal }, timeline) => {
    const modal = useRef(null);
    useOnClickOutside(modal, handleCloseModal);
    useLayoutEffect(() => {
      if (timeline instanceof Object && 'current' in timeline) {
        console.log('atteint');
        timeline.current = gsap
          .timeline()
          .set(modal.current, { y: '-100%', opacity: 0 })
          .to(modal.current, {
            y: '0',
            top: '5vh',
            duration: 0.5,
            opacity: 1,
          });
      }
    }, [timeline]);

    return (
      <div
        style={{
          background: 'rgba(0, 0, 0, 0.5)',
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100vw',
          height: '100vh',
        }}
      >
        <div
          ref={modal}
          style={{
            position: 'absolute',
            background: 'rgb(var(--grey-modal-bg-34))',
            width: '598px',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <div
            style={{
              background: 'rgb(var(--grey-bg-51))',
              borderBottom: 'none',
              borderRadius: '4px 4px 0 0',
              padding: '10px 15px',
              color: 'rgb(var(--white-text))',
              fontSize: '24px',
              fontWeight: 300,
              display: 'flex',
            }}
          >
            <Btn onClick={handleCloseModal}>
              {{ text: header, sibling: <CgClose /> }}
            </Btn>
          </div>
          {main}
        </div>
      </div>
    );
  }
);

export default Modal;
