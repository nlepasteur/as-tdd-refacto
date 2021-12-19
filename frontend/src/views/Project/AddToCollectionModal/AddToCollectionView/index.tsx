// types
import type { ComponentType } from 'react';
import type { Collection as CollectionType } from '@types';
import type { InjectedProps as CollectionProps } from '../Collection';
// components
import Btn from 'components/Btn';
import Collection from '../Collection';

export type InjectedProps = Omit<CollectionProps, 'collection'> & {
  collections: CollectionType[];
  changeView(): void;
};

const AddTocollectionView: ComponentType<InjectedProps> = ({
  changeView,
  collections,
  ...props
}) => (
  <div>
    <Btn onClick={changeView}>
      {{
        text: 'Create New Collection',
      }}
    </Btn>
    <ul>
      {collections.map((collection) => (
        <li key={collection.id}>
          <Collection collection={collection} {...props} />
        </li>
      ))}
    </ul>
  </div>
);

export default AddTocollectionView;
