// types
import type { ComponentType } from 'react';
import type { Collection } from '@types';

export type InjectedProps = {
  collection: Collection;
  project_id: string;
  addToCollection(arg: {
    project_id: string;
    collection_id: string;
  }): Promise<void>;
  projectIsIn: boolean;
};

const AddToCollectionListItem: ComponentType<InjectedProps> = ({
  collection,
  project_id,
  projectIsIn,
  addToCollection,
}) => (
  <>
    <div>{collection.name}</div>
    <div>{`${collection.projects_count} Projects`}</div>
    <button
      disabled={projectIsIn}
      onClick={() =>
        addToCollection({ project_id, collection_id: collection.id })
      }
    >
      {projectIsIn ? 'Added' : 'Add To Collection'}
    </button>
  </>
);

export default AddToCollectionListItem;
