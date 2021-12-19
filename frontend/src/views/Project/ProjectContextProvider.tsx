// types
import type { ReactNode } from 'react';
import type { FetchStatus, Project, Collection, CompleteProject } from '@types';
// libs
import { createContext, useReducer, useState, useCallback } from 'react';

const projectFetchInitialState = {
  status: 'init' as const,
  error: null,
  data: null,
};

type ProjectFetchState = {
  status: FetchStatus;
  error: null | string;
  data: null | Project;
};

type ProjectFetchStateAction =
  | { type: 'FETCHING' }
  | { type: 'FAILURE'; payload: string }
  | { type: 'SUCCESS'; payload: Project }
  | { type: 'UPDATE_COLLECTIONS'; payload: Collection };

const projectFetchReducer = (
  state: ProjectFetchState = projectFetchInitialState,
  action: ProjectFetchStateAction
): ProjectFetchState => {
  switch (action.type) {
    case 'FETCHING':
      return { ...state, status: 'fetching' };
    case 'FAILURE':
      return { ...state, error: action.payload, status: 'failure' };
    case 'SUCCESS':
      return { ...state, status: 'success', data: action.payload };
    case 'UPDATE_COLLECTIONS':
      const data = state.data as CompleteProject;
      return {
        ...state,
        data: {
          ...data,
          collections: [...data.collections, action.payload],
        },
      };
    default:
      return state;
  }
};

type ProjectContext = {
  projectFetchState: ProjectFetchState;
  updateProjectCollections(collection: Collection): void;
  setProjectFetchState(action: ProjectFetchStateAction): void;
  votable_id: string | null;
  setVotableId(id: string): void;
  showLikesModal: boolean;
  showAddToCollectionModal: boolean;
  toggleLikesModal(): void;
  toggleAddToCollectionModal(): void;
};

export const ProjectContext = createContext<ProjectContext>(
  {} as unknown as ProjectContext
);

const ProjectContextProvider = ({ children }: { children: ReactNode }) => {
  const [projectFetchState, dispatch] = useReducer(
    projectFetchReducer,
    projectFetchInitialState
  );

  const updateProjectCollections = (collection: Collection) =>
    dispatch({ type: 'UPDATE_COLLECTIONS', payload: collection });

  const setProjectFetchState = useCallback(
    (action: ProjectFetchStateAction) => {
      dispatch(action);
    },
    []
  );

  const [showLikesModal, toggleLikesModal] = useState(false);
  const [showAddToCollectionModal, toggleAddToCollectionModal] =
    useState(false);

  const [votableId, setVotableId] = useState<null | string>(null);
  return (
    <ProjectContext.Provider
      value={{
        projectFetchState,
        votable_id: votableId,
        setVotableId,
        setProjectFetchState,
        updateProjectCollections,
        toggleAddToCollectionModal: () => {
          console.log('called');
          toggleAddToCollectionModal(!showAddToCollectionModal);
        },
        toggleLikesModal: () => toggleLikesModal(!showLikesModal),
        showAddToCollectionModal,
        showLikesModal,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContextProvider;
