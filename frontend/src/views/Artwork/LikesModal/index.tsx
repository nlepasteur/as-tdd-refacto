// types
import type { ComponentType } from 'react';
import type { InjectedProps as PropsFromWithLikes } from './withLikes';
// libs
import { useRef } from 'react';
// hooks
import useOnClickOutside from 'hooks/useOnClickOutside';
// components
import withLikes from './withLikes';
import Like from './Like';

type InjectedProps = PropsFromWithLikes;

const Likes: ComponentType<InjectedProps> = ({ likes, toggleLikesModal }) => {
  const modal = useRef(null);
  useOnClickOutside(modal, () => toggleLikesModal());
  return (
    <ul ref={modal}>
      {likes.map((like) => (
        <li key={like.id} style={{ color: 'white' }}>
          <Like like={like} />
        </li>
      ))}
    </ul>
  );
};

export default withLikes(Likes);
