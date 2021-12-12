// types
import type { ComponentType } from 'react';
import type { Vote } from '@types';
// libs
import { Link } from 'react-router-dom';

type InjectedProps = { like: Vote };

const Like: ComponentType<InjectedProps> = ({ like }) => (
  <>
    <Link to={`/${like.user.username}`}>
      <img src={like.user.small_cover_url} alt={''} />
    </Link>
    <Link to={`/${like.user.username}`}>{like.user.username}</Link>
    <div>{like.user.followers_count}</div>
    <div>{like.user.projects_count}</div>
    <button>follow</button>
  </>
);

export default Like;
