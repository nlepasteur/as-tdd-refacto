// types
import type { ComponentType } from 'react';
import type { ConnectedProps } from 'react-redux';
import type { NavigateFunction } from 'react-router-dom';
import type { AppDispatch, RootState } from 'application/store';
import type { Explore } from 'application/reducers/explore';
// store utils
import { clearProjects } from 'application/actions/projects';
import { resetPage } from 'application/actions/page';
// libs
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const mapState = ({ isLogged, dimension, explore }: RootState) => ({
  isLogged,
  currentDimension: dimension,
  currentExplore: explore,
});

const mapDispatch = (dispatch: AppDispatch) => ({
  resetPage: () => dispatch(resetPage()),
  clearProjects: () => dispatch(clearProjects()),
});

export const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export type InjectedProps = PropsFromRedux & {
  navigate: NavigateFunction;
};

const withMappedStore = (UnwrappedComponent: ComponentType<InjectedProps>) => {
  function WithMappedStore(props: PropsFromRedux) {
    const navigate = useNavigate();
    return <UnwrappedComponent {...props} navigate={navigate} />;
  }

  const wrappedComponentName =
    UnwrappedComponent.displayName || UnwrappedComponent.name || 'Component';
  WithMappedStore.displayName = `withMappedStore(${wrappedComponentName})`;

  return WithMappedStore;
};

export default withMappedStore;
