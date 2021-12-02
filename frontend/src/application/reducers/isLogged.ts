import type { IsLoggedAction } from '../actions/isLogged';

const reducer = (state = true, action: IsLoggedAction) => {
  switch (action.type) {
    case 'IS_LOGGED':
      return true;
    default:
      return state;
  }
};

export default reducer;
