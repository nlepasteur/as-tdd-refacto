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
  'changeView' | 'project'
> &
  Omit<AddToCollectionViewProps, 'changeView'> & {
    status: FetchStatus;
  };

const AddToCollection: ComponentType<InjectedProps> = ({
  status,
  ...props
}) => {
  const [view, changeView] = useState(false);
  return status === 'init' || status === 'fetching' ? (
    <div>spinner...</div>
  ) : !view ? (
    <AddToCollectionView {...props} changeView={() => changeView(!view)} />
  ) : (
    <CreateCollectionView {...props} changeView={() => changeView(!view)} />
  );
};

export default AddToCollection;
