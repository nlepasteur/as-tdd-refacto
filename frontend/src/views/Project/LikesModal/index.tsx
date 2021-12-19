// types
export type { InjectedProps as LikesModalProps } from './withLikes';
// components
import withLikes from './withLikes';
import withSetters from './withSetters';
import LikesModal from './LikesModal';

export default withLikes(withSetters(LikesModal));
