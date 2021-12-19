// components
import withCollections, { connector } from './withCollections';
import withSetters from './withSetters';
import AddToCollectionModal from './AddToCollectionModal';

export default connector(withCollections(withSetters(AddToCollectionModal)));
