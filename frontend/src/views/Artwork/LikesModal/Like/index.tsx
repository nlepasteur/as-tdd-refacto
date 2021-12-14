// types
import type { ComponentType } from 'react';
import type { Vote } from '@types';
// libs
import { Link } from 'react-router-dom';

type InjectedProps = { like: Vote; handleCloseLikesModal(): void };

const Like: ComponentType<InjectedProps> = ({
  like,
  handleCloseLikesModal,
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
    {/* FOLLOW A ENLEVER ET A ISOLER PUISQU'UTILISE PARTOUT DANS APP */}
    <button>follow</button>
  </>
);

export default Like;
