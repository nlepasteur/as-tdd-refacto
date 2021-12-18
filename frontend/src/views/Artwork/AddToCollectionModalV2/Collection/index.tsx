// types
import type { ComponentType } from 'react';
import type { Collection as CollectionType } from '@types';
import type { CompleteProject } from '@types';

// CollectionProps
export type InjectedProps = {
  collection: CollectionType;
  project: Pick<CompleteProject, 'collections' | 'id'>;
  addToCollection(arg: {
    project_id: string;
    collection_id: string;
  }): Promise<void>;
};

const Collection: ComponentType<InjectedProps> = ({
  collection: { id: collection_id, name, projects_count },
  project: { id: project_id, collections },
  addToCollection,
}) => {
  return (
    <>
      <div>{name}</div>
      <div>{`${projects_count} Projects`}</div>
      <button
        disabled={
          !collections.every((collection) => collection.id !== collection_id)
        }
        onClick={() => addToCollection({ project_id, collection_id })}
      >
        {!collections.every((collection) => collection.id !== collection_id)
          ? 'Added'
          : 'Add To Collection'}
      </button>
    </>
  );
};

export default Collection;
