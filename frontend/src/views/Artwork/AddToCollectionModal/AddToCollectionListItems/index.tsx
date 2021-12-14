// types
import type { ComponentType } from 'react';
import type { InjectedProps as AddToCollectionListItemProps } from '../AddToCollectionListItem';
// components
import AddToCollectionListItem from '../AddToCollectionListItem';

export type InjectedProps = Pick<
  AddToCollectionListItemProps,
  'addToCollection' | 'project_id'
> & {
  in: string[];
  collections: AddToCollectionListItemProps['collection'][];
};

const AddToCollectionListItems: ComponentType<InjectedProps> = ({
  collections,
  ...props
}) => (
  <ul>
    {collections.map((collection) => (
      <li key={collection.id}>
        <AddToCollectionListItem
          collection={collection}
          {...props}
          projectIsIn={props.in.includes(collection.id)}
        />
      </li>
    ))}
  </ul>
);

export default AddToCollectionListItems;
