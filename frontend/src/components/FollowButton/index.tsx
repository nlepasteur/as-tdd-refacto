// components
import withStateUtils, { connector } from './withStateUtils';
import withSetters from './withSetters';
import Button from './Button';
// style
import './FollowButton.css';

export default connector(withStateUtils(withSetters(Button)));
