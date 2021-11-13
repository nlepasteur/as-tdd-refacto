// types
import type { ComponentType } from 'react';
import type { ConnectedProps } from 'react-redux';
import type { Location, NavigateFunction } from 'react-router-dom';
import type { AppDispatch, RootState } from 'application/store';
import type { Explore } from 'application/reducers/explore';
// store utils
import { setExplore } from 'application/actions/explore';
// libs
import { connect } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const mapState = ({ isLogged, dimension }: RootState) => ({
  isLogged,
  dimension,
});

const mapDispatch = (dispatch: AppDispatch) => ({
  setExplore: (explore: Explore) => dispatch(setExplore(explore)),
});

export const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export type InjectedProps = PropsFromRedux & {
  location: Location;
  navigate: NavigateFunction;
};

const withMappedStore = (UnwrappedComponent: ComponentType<InjectedProps>) => {
  function WithMappedStore(props: PropsFromRedux) {
    const location = useLocation();
    const navigate = useNavigate();
    return (
      <UnwrappedComponent {...props} location={location} navigate={navigate} />
    );
  }

  const wrappedComponentName =
    UnwrappedComponent.displayName || UnwrappedComponent.name || 'Component';
  WithMappedStore.displayName = `withMappedStore(${wrappedComponentName})`;

  return WithMappedStore;
};

export default withMappedStore;
