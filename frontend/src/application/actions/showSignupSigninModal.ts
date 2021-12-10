export const toggleSignupSigninModal = () =>
  ({
    type: 'TOGGLE_SIGNUP_SIGNIN_MODAL',
  } as const);

export type ToggleSignupSigninModalAction = ReturnType<
  typeof toggleSignupSigninModal
>;
