// types
import type { ComponentType } from 'react';
import type { Collection as CollectionType, CompleteProject } from '@types';

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
  project,
  addToCollection,
}) => (
  <>
    <button
      onClick={() =>
        addToCollection({
          project_id: project.id,
          collection_id,
        })
      }
      disabled={
        !project.collections.every(
          (collection) => collection.id !== collection_id
        )
      }
    >
      {project.collections.every(
        (collection) => collection.id !== collection_id
      )
        ? 'Add To Collection'
        : 'Added'}
    </button>
    <div>{projects_count} Projects</div>
    <div>{name}</div>
  </>
);

export default Collection;
