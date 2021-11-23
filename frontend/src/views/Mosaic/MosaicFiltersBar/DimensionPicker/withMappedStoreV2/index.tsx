// types
import type { ComponentType } from 'react';
import type { ConnectedProps } from 'react-redux';
import type { NavigateFunction } from 'react-router';
import type { AppDispatch, RootState } from 'application/types';
// libs
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// action creators
import { clearProjects } from 'application/actions/projects';
import { resetPage } from 'application/actions/page';

const mapState = ({ explore, dimension }: RootState) => ({
  currentExplore: explore,
  currentDimension: dimension,
});

const mapDispatch = (dispatch: AppDispatch) => ({
  clearProjects: () => dispatch(clearProjects()),
  resetPage: () => dispatch(resetPage()),
});

export const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export type InjectedProps = PropsFromRedux & { navigate: NavigateFunction };

const withMappedStore = (UnwrappedComponent: ComponentType<InjectedProps>) => {
  function WithMappedStore(props: PropsFromRedux) {
    const navigate = useNavigate();
    return <UnwrappedComponent navigate={navigate} {...props} />;
  }
  return WithMappedStore;
};

export default withMappedStore;
