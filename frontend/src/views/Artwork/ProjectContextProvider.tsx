// types
import type { ReactNode, Dispatch } from 'react';
// libs
import { createContext, useReducer } from 'react';

const initialState = {
  showLikesModal: false,
  showAddToCollectionModal: false,
  votable_id: null,
};

type State = Readonly<typeof initialState> & { votable_id: null | string };

export const toggleLikesModal = () =>
  ({
    type: 'TOGGLE_LIKES_MODAL',
  } as const);

export const toggleAddToCollectionModal = () =>
  ({
    type: 'TOGGLE_ADD_TO_COLLECTION_MODAL',
  } as const);

type ToggleLikesModalAction =
  | ReturnType<typeof toggleLikesModal>
  | ReturnType<typeof toggleAddToCollectionModal>;

export type ArtworkContextAction = ToggleLikesModalAction;

const reducer = (state = initialState, action: ArtworkContextAction): State => {
  switch (action.type) {
    case 'TOGGLE_LIKES_MODAL':
      return { ...state, showLikesModal: !state.showLikesModal };
    case 'TOGGLE_ADD_TO_COLLECTION_MODAL':
      return {
        ...state,
        showAddToCollectionModal: !state.showAddToCollectionModal,
      };
    default:
      return state;
  }
};

interface ProjectContext extends State {
  dispatch: Dispatch<ArtworkContextAction>;
}

export const ProjectContext = createContext<ProjectContext>(
  {} as unknown as ProjectContext
);

const ProjectContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ProjectContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContextProvider;
