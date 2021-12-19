// types
import type { ComponentType } from 'react';
import type { FetchState, Like as LikeType } from '@types';
import type { InjectedProps as LikeProps } from '../Like';
// components
import Like from '../Like';

export type InjectedProps = Pick<LikeProps, 'followSuccessCallback'> & {
  likes: LikeProps['like'][];
} & Pick<FetchState<LikeType>, 'status'>;

const Likes: ComponentType<InjectedProps> = ({
  likes,
  followSuccessCallback,
  status,
}) => (
  <>
    {status === 'init' || status === 'fetching' ? (
      <div>spinner...</div>
    ) : (
      <ul>
        {likes.map((like) => (
          <li key={like.id}>
            <Like like={like} followSuccessCallback={followSuccessCallback} />
          </li>
        ))}
      </ul>
    )}
  </>
);

export default Likes;
