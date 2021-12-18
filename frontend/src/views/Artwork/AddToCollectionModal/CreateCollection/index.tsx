// types
import type { ComponentType } from 'react';
// libs
import { useState } from 'react';

export type InjectedProps = {
  project_id: string;
  createCollection(arg: { project_id: string; name: string }): Promise<void>;
  cancel(): void;
};

const CreateCollection: ComponentType<InjectedProps> = ({
  project_id,
  cancel,
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
      <button onClick={cancel}>Cancel</button>
      <button onClick={() => createCollection({ project_id, name })}>
        Create
      </button>
    </div>
  );
};

export default CreateCollection;
