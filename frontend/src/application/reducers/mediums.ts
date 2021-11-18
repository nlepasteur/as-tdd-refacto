// types
import type { FetchState } from '@types';
import type {
  FetchMediumsAction,
  MediumsAction,
} from 'application/actions/mediums';
// utils
import updateStringPresenceDepending from 'utils/updateStringPresenceDepending';

export type Medium = {
  id: string;
  name: string;
  uri: string;
};

export type MediumsState = FetchState<Medium>;

const initialState = {
  status: 'init',
  error: null,
  data: [] as Medium[],
} as const;

const mediumsStateReducer = (
  state: MediumsState = initialState,
  action: FetchMediumsAction
): MediumsState => {
  switch (action.type) {
    case 'MEDIUMS_FETCHING':
      return { ...state, status: 'fetching', error: null, data: [] };
    case 'MEDIUMS_FAILURE':
      return { ...state, status: 'failure', error: action.payload, data: [] };
    case 'MEDIUMS_SUCCESS':
      return { ...state, status: 'success', error: null, data: action.payload };
    default:
      return state;
  }
};

const pickedMediumsReducer = (state = '', action: MediumsAction) => {
  switch (action.type) {
    case 'UPDATE_PICKED_MEDIUMS':
      return updateStringPresenceDepending({
        initialString: state,
        string: action.payload,
      });
    case 'CLEAR_PICKED_MEDIUMS':
      return '';
    default:
      return state;
  }
};

export default {
  mediumsState: mediumsStateReducer,
  mediums: pickedMediumsReducer,
};
