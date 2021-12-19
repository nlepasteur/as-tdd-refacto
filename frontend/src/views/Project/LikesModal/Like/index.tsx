// types
import type { ComponentType } from 'react';
import type { Like as LikeType, Following } from '@types';
// libs
import { Link } from 'react-router-dom';
// components
import FollowButton from 'components/FollowButton';

export type InjectedProps = {
  like: LikeType;
  followSuccessCallback(following: Following): void;
};

const Like: ComponentType<InjectedProps> = ({
  like,
  followSuccessCallback,
}) => (
  <>
    <div className="like__user">
      <Link to={`/${like.user.username}`}>
        <img src={like.user.small_cover_url} alt={''} />
      </Link>
      <Link to={`/${like.user.username}`} className="like__username">
        {like.user.username}
      </Link>
      <div className="like__followers-count">{like.user.followers_count}</div>
      <div className="like__projects-count">{like.user.projects_count}</div>

      <div className="like__headline">headline</div>
    </div>
    <FollowButton
      user={{ id: like.user.id, followed: like.user.followed }}
      successCallback={followSuccessCallback}
    />
  </>
);

export default Like;
