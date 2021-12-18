// types
import type { ComponentType } from 'react';
import type { FetchState, Like as LikeType } from '@types';
import type { InjectedProps as LikeProps } from '../Like';
// components
import Like from '../Like';

export type InjectedProps = Pick<LikeProps, 'successCallback'> & {
  likes: LikeProps['like'][];
} & Pick<FetchState<LikeType>, 'status'>;

const Likes: ComponentType<InjectedProps> = ({ likes, successCallback }) => (
  <ul>
    {likes.map((like) => (
      <li key={like.id}>
        <Like like={like} successCallback={successCallback} />
      </li>
    ))}
  </ul>
);

export default Likes;
