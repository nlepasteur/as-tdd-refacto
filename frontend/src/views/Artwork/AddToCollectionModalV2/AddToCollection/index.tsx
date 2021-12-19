// types
import type { ComponentType } from 'react';
import type { FetchStatus } from '@types';
import type { InjectedProps as AddToCollectionViewProps } from '../AddToCollectionView';
import type { InjectedProps as CreateCollectionViewProps } from '../CreateCollectionView';
// libs
import { useState } from 'react';
// components
import AddToCollectionView from '../AddToCollectionView';
import CreateCollectionView from '../CreateCollectionView';

export type InjectedProps = Omit<
  CreateCollectionViewProps,
  'changeAddToCollectionModalView'
> &
  Omit<AddToCollectionViewProps, 'changeAddToCollectionModalView'> & {
    status: FetchStatus;
  };

const AddToCollection: ComponentType<InjectedProps> = ({
  status,
  project,
  collections,
  addToCollection,
  createCollection,
}) => {
  const [view, setView] = useState(false);
  const changeAddToCollectionModalView = () => setView(!view);
  return (
    <div>
      {view ? (
        <CreateCollectionView
          project={{ id: project.id }}
          changeAddToCollectionModalView={changeAddToCollectionModalView}
          createCollection={createCollection}
        />
      ) : (
        <AddToCollectionView
          collections={collections}
          project={project}
          changeAddToCollectionModalView={changeAddToCollectionModalView}
          addToCollection={addToCollection}
        />
      )}
    </div>
  );
};

export default AddToCollection;
