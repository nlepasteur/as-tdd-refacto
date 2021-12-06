// types
import type { ComponentType } from 'react';
import type { ConnectedProps } from 'react-redux';
import type { RootState, AppDispatch } from 'application/types';
// libs
import { connect } from 'react-redux';
// action creators
import { removePopUpError } from 'application/actions/popUpErrors';

const mapState = ({ popUpErrors }: RootState) => ({
  popUpErrors,
});

const mapDispatch = (dispatch: AppDispatch) => ({
  removePopUpError: (errorId: string) => dispatch(removePopUpError(errorId)),
});

export const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export type InjectedProps = PropsFromRedux;

const withPopUpErrors = (UnwrappedComponent: ComponentType<InjectedProps>) => {
  const WithPopUpErrors = (props: PropsFromRedux) => (
    <UnwrappedComponent {...props} />
  );
  return WithPopUpErrors;
};

export default withPopUpErrors;
