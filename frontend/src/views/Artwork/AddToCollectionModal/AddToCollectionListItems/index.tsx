// types
import type { ComponentType } from 'react';
import type { InjectedProps as AddToCollectionListItemProps } from '../AddToCollectionListItem';
// components
import Btn from 'components/Btn';
import AddToCollectionListItem from '../AddToCollectionListItem';

export type InjectedProps = Pick<
  AddToCollectionListItemProps,
  'addToCollection' | 'project_id'
> & {
  in: string[];
  collections: AddToCollectionListItemProps['collection'][];
  handleClickCreateNewCollection(): void;
};

const AddToCollectionListItems: ComponentType<InjectedProps> = ({
  collections,
  handleClickCreateNewCollection,
  ...props
}) => (
  <div>
    <Btn onClick={handleClickCreateNewCollection} style={{ color: 'white' }}>
      {{
        text: 'Create New Collection',
      }}
    </Btn>
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
  </div>
);

export default AddToCollectionListItems;
