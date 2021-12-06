// types
import type { PopUpErrorMsgAction } from '../actions/popUpErrors';

export type PopUpError = {
  message: string;
  id: string;
};

const reducer = (state: PopUpError[] = [], action: PopUpErrorMsgAction) => {
  switch (action.type) {
    case 'ADD_POP_UP_ERROR':
      return [...state, action.payload];
    case 'REMOVE_POP_UP_ERROR':
      return state.filter((e) => e.id !== action.payload);
    default:
      return state;
  }
};

export default reducer;
