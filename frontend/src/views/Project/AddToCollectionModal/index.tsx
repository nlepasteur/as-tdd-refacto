// types
export type { InjectedProps as AddToCollectionModalProps } from './withStateUtils';
// components
import withStateUtils from './withStateUtils';
import withSetters from './withSetters';
import AddToCollectionModal from './AddToCollectionModal';

export default withStateUtils(withSetters(AddToCollectionModal));
