// types
import type { ComponentType } from 'react';
import type { CompleteProject } from '@types';
// libs
import { useState } from 'react';

// CreateCollectionViewProps
export type InjectedProps = {
  changeAddToCollectionModalView(): void;
  createCollection(arg: { project_id: string; name: string }): Promise<void>;
  project: Pick<CompleteProject, 'id'>;
  //   addPopUpError(arg: { message: string }): void;
};

const CreateCollectionView: ComponentType<InjectedProps> = ({
  project,
  changeAddToCollectionModalView,
  createCollection,
}) => {
  const [name, setName] = useState('');
  return (
    <div>
      <input
        placeholder="Collection name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={changeAddToCollectionModalView}>Cancel</button>
      <button
        onClick={() => createCollection({ project_id: project.id, name })}
      >
        Create
      </button>
    </div>
  );
};

export default CreateCollectionView;
