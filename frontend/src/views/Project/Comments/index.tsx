// components
import withComments, { connector } from './withComments';
import withSetters from './withSetters';
import CommentsList from './CommentsList';

export default connector(withComments(withSetters(CommentsList)));
