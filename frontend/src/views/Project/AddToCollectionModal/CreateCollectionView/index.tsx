// types
import type { ComponentType } from 'react';
// libs
import { useState } from 'react';

export type InjectedProps = {
  changeView(): void;
  createCollection(arg: { project_id: string; name: string }): Promise<void>;
  project: {
    id: string;
  };
};

const CreateCollectionView: ComponentType<InjectedProps> = ({
  project: { id: project_id },
  createCollection,
  changeView,
}) => {
  const [name, setName] = useState('');
  return (
    <div>
      <input onChange={(e) => setName(e.target.value)} value={name} />
      <button onClick={changeView}>Cancel</button>
      <button onClick={() => createCollection({ project_id, name })}>
        Create
      </button>
    </div>
  );
};

export default CreateCollectionView;
