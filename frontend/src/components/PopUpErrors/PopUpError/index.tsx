// types
import type { ComponentType } from 'react';
import type { InjectedProps as PropsFromWithPopUpErrors } from '..';
// libs
import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
// components
import { BsExclamationOctagon } from 'react-icons/bs';
import { MdClose } from 'react-icons/md';

type OwnProps = { id: string; message: string };

type InjectedProps = OwnProps &
  Pick<PropsFromWithPopUpErrors, 'removePopUpError'>;

const PopUpErrorMsg: ComponentType<InjectedProps> = ({
  message,
  id,
  removePopUpError,
}) => {
  const el = useRef(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    timeline.current = gsap
      .timeline()
      .from(el.current, { x: '-100%' })
      .to(el.current, { x: 15, duration: 0.3 })
      .to(el.current, {}, '>3')
      .addLabel('end')
      .to(el.current, { opacity: 0 })
      .call(() => {
        removePopUpError(id);
      });
  }, [id, removePopUpError]);

  const handleClick = () => {
    timeline.current?.pause().play('end');
  };

  return (
    <button onClick={handleClick} ref={el}>
      <MdClose
        style={{
          position: 'absolute',
          color: '#bbb',
          top: '10px',
          right: '10px',
        }}
      />
      <BsExclamationOctagon
        style={{
          color: '#d9534f',
        }}
      />
      {message}
    </button>
  );
};

export default PopUpErrorMsg;
