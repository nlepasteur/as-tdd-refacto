// types
import type { ReactNode, Dispatch } from 'react';
// libs
import { createContext, useReducer } from 'react';

const initialState = {
  showLikesModal: false,
  votableId: null,
};

type State = Readonly<typeof initialState> & { votableId: null | string };

export const toggleLikesModal = () =>
  ({
    type: 'TOGGLE_LIKES_MODAL',
  } as const);

type ToggleLikesModalAction = ReturnType<typeof toggleLikesModal>;

type ArtworkContextAction = ToggleLikesModalAction;

const reducer = (state = initialState, action: ArtworkContextAction): State => {
  switch (action.type) {
    case 'TOGGLE_LIKES_MODAL':
      return { ...state, showLikesModal: !state.showLikesModal };
    default:
      return state;
  }
};

interface ArtworkContext extends State {
  dispatch: Dispatch<ArtworkContextAction>;
}

export const ArtworkContext = createContext<ArtworkContext>(
  null as unknown as ArtworkContext
);

const ArtworkContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ArtworkContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ArtworkContext.Provider>
  );
};

export default ArtworkContextProvider;
