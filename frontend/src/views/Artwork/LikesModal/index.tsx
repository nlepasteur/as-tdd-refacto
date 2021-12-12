// types
import type { ComponentType } from 'react';
import type { InjectedProps as PropsFromWithLikes } from './withLikes';
// libs
import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
// hooks
import useOnClickOutside from 'hooks/useOnClickOutside';
// components
import withLikes from './withLikes';
import Like from './Like';

type InjectedProps = PropsFromWithLikes;

const Likes: ComponentType<InjectedProps> = ({ likes, toggleLikesModal }) => {
  const modal = useRef(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const handleCloseLikesModal = () => {
    if (timeline.current) {
      timeline.current.reverse().then(() => toggleLikesModal());
    }
  };

  useOnClickOutside(modal, handleCloseLikesModal);
  useLayoutEffect(() => {
    timeline.current = gsap
      .timeline()
      .set(modal.current, { y: '-100%', opacity: 0 })
      .to(modal.current, { y: '-50%', top: '50%', duration: 0.5, opacity: 1 });
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
      <ul
        ref={modal}
        style={{
          position: 'absolute',
          backgroundColor: '#171717',
          width: '300px',
          height: '150px',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        {likes.map((like) => (
          <li key={like.id} style={{ color: 'white' }}>
            <Like like={like} handleCloseLikesModal={handleCloseLikesModal} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default withLikes(Likes);
