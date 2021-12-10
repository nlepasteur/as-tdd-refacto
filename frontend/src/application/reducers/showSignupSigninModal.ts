// types
import type { ToggleSignupSigninModalAction } from '../actions/showSignupSigninModal';

const reducer = (state = false, action: ToggleSignupSigninModalAction) => {
  switch (action.type) {
    case 'TOGGLE_SIGNUP_SIGNIN_MODAL':
      return !state;
    default:
      return state;
  }
};

export default reducer;
