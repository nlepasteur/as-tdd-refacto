// types
import type { PopUpError } from '../reducers/popUpErrors';

export const addPopUpError = (payload: PopUpError) =>
  ({
    type: 'ADD_POP_UP_ERROR',
    payload,
  } as const);

export const removePopUpError = (payload: PopUpError['id']) =>
  ({
    type: 'REMOVE_POP_UP_ERROR',
    payload,
  } as const);

export type AddPopUpErrorAction = ReturnType<typeof addPopUpError>;

export type PopUpErrorMsgAction =
  | ReturnType<typeof addPopUpError>
  | ReturnType<typeof removePopUpError>;
