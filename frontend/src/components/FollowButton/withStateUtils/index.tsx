// types
import type { ComponentType } from 'react';
import type { ConnectedProps } from 'react-redux';
import type { RootState, AppDispatch } from 'application/types';
import type { InjectedProps as WithSettersProps } from '../withSetters';
// libs
import { connect } from 'react-redux';
// action creators
import { toggleSignupSigninModal } from 'application/actions/showSignupSigninModal';

const mapState = ({ isLogged }: RootState) => ({
  isLogged,
});

const mapDispatch = (dispatch: AppDispatch) => ({
  toggleSignupSigninModal: () => dispatch(toggleSignupSigninModal()),
});

export const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type InjectedProps = PropsFromRedux &
  Omit<WithSettersProps, keyof PropsFromRedux>;

const withStateUtils = (
  UnwrappedComponent: ComponentType<WithSettersProps>
) => {
  const WithStateUtils = (props: InjectedProps) => (
    <UnwrappedComponent {...props} />
  );
  return WithStateUtils;
};

export default withStateUtils;
