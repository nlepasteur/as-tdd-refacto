// types
import type { ComponentType } from 'react';
import type { InjectedProps as CollectionProps } from '../Collection';
// components
import Collection from '../Collection';
import Btn from 'components/Btn';

// AddToCollectionViewProps
export type InjectedProps = {
  collections: CollectionProps['collection'][];
  changeAddToCollectionModalView(): void;
} & Omit<CollectionProps, 'collection'>;

const AddToCollectionView: ComponentType<InjectedProps> = ({
  collections,
  changeAddToCollectionModalView,
  ...props
}) => (
  <div>
    <Btn onClick={changeAddToCollectionModalView}>
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

export default AddToCollectionView;
