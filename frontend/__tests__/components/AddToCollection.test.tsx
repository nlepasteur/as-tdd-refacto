// // types
// import { Collection } from '@types';
// import { InjectedProps as AddToCollectionListItemProps } from 'views/Artwork/AddToCollectionModal/AddToCollectionListItem';
// import { InjectedProps as CreateCollectionProps } from 'views/Artwork/AddToCollectionModal/CreateCollection';
// // libs
// import { render, fireEvent, screen, cleanup } from '@testing-library/react';
// // components under test
// import AddToCollectionListItem from 'views/Artwork/AddToCollectionModal/AddToCollectionListItem';
// import CreateCollection from 'views/Artwork/AddToCollectionModal/CreateCollection';

// describe('AddToCollectionModal', () => {
//   describe('AddToCollectionListItem', () => {
//     const stubInjectedCollection: Collection = {
//       id: '0',
//       user_id: '',
//       name: 'collection',
//       active_projects_count: 0,
//       projects_count: 0,
//       is_private: false,
//       micro_square_image_url: '',
//       small_square_image_url: '',
//     };
//     const baseStubInjectedProps: AddToCollectionListItemProps = {
//       project_id: 'projectId',
//       collection: stubInjectedCollection,
//       projectIsIn: false,
//       addToCollection: jest.fn(),
//     };

//     it('displays a "Add To Collection" button', () => {
//       const stubInjectedProps = baseStubInjectedProps;
//       const { getByRole } = render(
//         <AddToCollectionListItem {...stubInjectedProps} />
//       );
//       expect(
//         getByRole('button', { name: /add to collection/i })
//       ).toBeInTheDocument();
//     });

//     it('the number of projects in the collection is displayed', () => {
//       const stubInjectedProps = {
//         ...baseStubInjectedProps,
//         collection: { ...stubInjectedCollection, projects_count: 42 },
//       };
//       const { getByText } = render(
//         <AddToCollectionListItem {...stubInjectedProps} />
//       );
//       expect(
//         getByText(
//           RegExp(`${stubInjectedProps.collection.projects_count} projects`, 'i')
//         )
//       ).toBeInTheDocument();
//     });

//     describe('given a collection which name is "collection"', () => {
//       it('displays "collection', () => {
//         const stubInjectedProps = baseStubInjectedProps;
//         const { getByText } = render(
//           <AddToCollectionListItem {...stubInjectedProps} />
//         );
//         expect(getByText(/collection/)).toBeInTheDocument();
//       });
//     });

//     describe('the collection does not contains the project to add to a collection', () => {
//       it('on click, "Add To Collection" button calls "addToCollection"', () => {
//         const stubInjectedProps = baseStubInjectedProps;
//         const { getByRole } = render(
//           <AddToCollectionListItem {...stubInjectedProps} />
//         );
//         fireEvent.click(getByRole('button'));
//         expect(stubInjectedProps.addToCollection).toBeCalledWith({
//           project_id: stubInjectedProps.project_id,
//           collection_id: stubInjectedProps.collection.id,
//         });
//       });
//     });

//     describe('the collection already contains the project to add to a collection', () => {
//       it('"Add To Collection" button is disabled', () => {
//         const stubInjectedProps = {
//           ...baseStubInjectedProps,
//           projectIsIn: true,
//         };
//         const { getByRole } = render(
//           <AddToCollectionListItem {...stubInjectedProps} />
//         );
//         expect(getByRole('button')).toHaveAttribute('disabled');
//       });

//       it('"Add To Collection" button text is "Added"', () => {
//         const stubInjectedProps = {
//           ...baseStubInjectedProps,
//           projectIsIn: true,
//         };
//         const { getByRole } = render(
//           <AddToCollectionListItem {...stubInjectedProps} />
//         );
//         expect(getByRole('button', { name: /added/i })).toBeInTheDocument();
//       });
//     });
//   });

//   describe('CreateCollection', () => {
//     let stubInjectedProps: CreateCollectionProps;
//     beforeEach(() => {
//       stubInjectedProps = {
//         project_id: 'id',
//         createCollection: jest.fn(),
//         cancel: jest.fn(),
//       };
//       render(<CreateCollection {...stubInjectedProps} />);
//     });

//     afterEach(() => {
//       cleanup();
//     });
//     it('displays an input in which to write the name of the collection to create', () => {
//       expect(screen.getByRole('textbox')).toBeInTheDocument();
//     });

//     it('displays a "Cancel" button', () => {
//       expect(
//         screen.getByRole('button', { name: /cancel/i })
//       ).toBeInTheDocument();
//     });

//     describe('on click on "Cancel" button', () => {
//       it('calls "cancel"', () => {
//         fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
//         expect(stubInjectedProps.cancel).toBeCalled();
//       });
//     });

//     it('displays a "Create" button', () => {
//       expect(
//         screen.getByRole('button', { name: /create/i })
//       ).toBeInTheDocument();
//     });

//     describe('on click on "Create" button', () => {
//       it('calls "createCollection"', () => {
//         fireEvent.click(screen.getByRole('button', { name: /create/i }));
//         expect(stubInjectedProps.createCollection).toBeCalled();
//       });
//     });

//     describe('on click on "Create" button with input value as "collection"', () => {
//       it('calls "createCollection" with "collection" as "name" property and "id" with "project_id" property', () => {
//         const expected = { project_id: 'id', name: 'collection' };
//         fireEvent.change(screen.getByRole('textbox'), {
//           target: { value: 'collection' },
//         });
//         fireEvent.click(screen.getByRole('button', { name: /create/i }));
//         expect(stubInjectedProps.createCollection).toBeCalledWith(expected);
//       });
//     });
//   });
// });
// types
import type { Collection as CollectionType } from '@types';
// libs
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
// components under test
import Collection from 'views/Artwork/AddToCollectionModalV3/Collection';
import AddToCollectionView from 'views/Artwork/AddToCollectionModalV3/AddToCollectionView';
import CreateCollectionView from 'views/Artwork/AddToCollectionModalV3/CreateCollectionView';

const stubInjectedCollection: CollectionType = {
  id: 'id',
  user_id: 'id',
  name: 'collection',
  active_projects_count: 0,
  projects_count: 0,
  is_private: false,
  micro_square_image_url: '',
  small_square_image_url: '',
};

const baseStubInjectedProps = {
  collection: stubInjectedCollection,
  addToCollection: jest.fn(),
  project: {
    id: 'id',
    collections: [],
  },
};
describe('Collection', () => {
  it('the number of projects in the collection is displayed', () => {
    const { getByText } = render(<Collection {...baseStubInjectedProps} />);
    expect(
      getByText(
        RegExp(
          `${baseStubInjectedProps.collection.projects_count} projects`,
          'i'
        )
      )
    ).toBeInTheDocument();
  });

  describe('given a collection which name is "collection"', () => {
    it('displays "collection', () => {
      const { getByText } = render(<Collection {...baseStubInjectedProps} />);
      expect(
        getByText(baseStubInjectedProps.collection.name)
      ).toBeInTheDocument();
    });
  });

  describe('the collection does not contain the project', () => {
    it('displays a "Add To Collection" button', () => {
      const { getByRole } = render(<Collection {...baseStubInjectedProps} />);
      expect(
        getByRole('button', { name: /add to collection/i })
      ).toBeInTheDocument();
    });

    it('on click, "Add To Collection" button calls "addToCollection"', () => {
      const { getByRole } = render(<Collection {...baseStubInjectedProps} />);
      fireEvent.click(getByRole('button'));
      expect(baseStubInjectedProps.addToCollection).toBeCalledWith({
        project_id: baseStubInjectedProps.project.id,
        collection_id: baseStubInjectedProps.collection.id,
      });
    });
  });

  describe('the collection contains the project', () => {
    const stubInjectedProps = {
      ...baseStubInjectedProps,
      project: {
        ...baseStubInjectedProps.project,
        collections: [
          ...baseStubInjectedProps.project.collections,
          stubInjectedCollection,
        ],
      },
    };
    it('displays a "Added" button', () => {
      const { getByRole } = render(<Collection {...stubInjectedProps} />);
      expect(getByRole('button', { name: /added/i })).toBeInTheDocument();
    });

    it('"Add To Collection" button is disabled', () => {
      const { getByRole } = render(<Collection {...stubInjectedProps} />);
      expect(getByRole('button')).toHaveAttribute('disabled');
    });
  });
});

describe('AddToCollectionView', () => {
  const stubInjectedProps = {
    collections: [],
    project: baseStubInjectedProps.project,
    addToCollection: jest.fn(),
    changeView: jest.fn(),
  };

  it('displays a "Create New Collection" button', () => {
    const { getByRole } = render(
      <AddToCollectionView {...stubInjectedProps} />
    );
    expect(
      getByRole('button', { name: /create new collection/i })
    ).toBeInTheDocument();
  });

  it('on click, "Create New Collection" button calls "changeView"', () => {
    const changeView = jest.fn();
    const { getByRole } = render(
      <AddToCollectionView {...stubInjectedProps} changeView={changeView} />
    );
    fireEvent.click(getByRole('button', { name: /create new collection/i }));
    expect(changeView).toBeCalled();
  });
});

describe('CreateCollectionView', () => {
  let injectedProps: {
    createCollection(arg: { project_id: string; name: string }): Promise<void>;
    changeView(): void;
    project: {
      id: string;
    };
  };

  beforeEach(() => {
    injectedProps = {
      createCollection: jest.fn(),
      changeView: jest.fn(),
      project: {
        id: 'id',
      },
    };
    render(<CreateCollectionView {...injectedProps} />);
  });

  afterEach(() => {
    cleanup();
  });
  it('displays a "Cancel" button', () => {
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });

  it('on click, "Cancel" button calls "changeView"', () => {
    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(injectedProps.changeView).toBeCalled();
  });

  it('displays a "Create" button', () => {
    expect(screen.getByRole('button', { name: /create/i })).toBeInTheDocument();
  });

  it('on click, "Create" button calls "createCollection"', () => {
    const expected = {
      project_id: injectedProps.project.id,
      name: 'collection name',
    };
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: expected.name },
    });
    fireEvent.click(screen.getByRole('button', { name: /create/i }));
    expect(injectedProps.createCollection).toBeCalledWith(expected);
  });
});
