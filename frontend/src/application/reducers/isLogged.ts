import type { IsLoggedAction } from '../actions/isLogged';

const reducer = (state = false, action: IsLoggedAction) => {
  switch (action.type) {
    case 'IS_LOGGED':
      return true;
    default:
      return state;
  }
};

export default reducer;
