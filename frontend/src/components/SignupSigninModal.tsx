// libs
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
// store hooks
import { useAppDispatch } from 'application/hooks';
// action creators
import { toggleSignupSigninModal } from 'application/actions/showSignupSigninModal';
// hooks
import useOnClickOutside from 'hooks/useOnClickOutside';

const SignupSigninModal = () => {
  const dispatch = useAppDispatch();
  const modal = useRef(null);
  useOnClickOutside(modal, () => {
    dispatch(toggleSignupSigninModal());
  });
  useLayoutEffect(() => {
    gsap
      .timeline()
      .set(modal.current, { y: '-100%' })
      .to(modal.current, { y: '-50%', top: '50%' });
  }, []);
  return (
    <div
      style={{
        backgroundColor: 'rgba(0,0,0,.5)',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
      }}
    >
      <div ref={modal} style={{ color: 'white', position: 'absolute' }}>
        ici signup et signin formulaire
      </div>
    </div>
  );
};

export default SignupSigninModal;
