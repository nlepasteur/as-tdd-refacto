// types
import type { MediasAction } from '../actions/medias';
// utils
import updateStringPresenceDepending from 'utils/updateStringPresenceDepending';

export type Media = { name: string; as_query: string };

const pickedMediasReducer = (state = '', action: MediasAction) => {
  switch (action.type) {
    case 'UPDATE_PICKED_MEDIAS':
      return updateStringPresenceDepending({
        initialString: state,
        string: action.payload,
      });
    case 'CLEAR_PICKED_MEDIAS':
      return '';
    default:
      return state;
  }
};

export default pickedMediasReducer;
