// types
import type { RootState } from 'application/types';

const getPopUpErrorMsgs = ({ popUpErrors }: RootState) => popUpErrors;

export default getPopUpErrorMsgs;
