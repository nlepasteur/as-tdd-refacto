// types
import type { ComponentType } from 'react';
import type { ConnectedProps } from 'react-redux';
import type { NavigateFunction } from 'react-router-dom';
import type { RootState, AppDispatch, Dimension } from 'application/types';
// action creators
import { setDimension } from 'application/actions/dimension';
// import { clearProjects } from 'application/actions/projects';
// import { resetPagination } from 'application/actions/pagination';
// libs
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const mapState = ({ explore, dimension }: RootState) => ({
  currentExplore: explore,
  currentDimension: dimension,
});

const mapDispatch = (dispatch: AppDispatch) => ({
  setDimension: (dimension: Dimension) => dispatch(setDimension(dimension)),
  //   resetPagination: () => dispatch(resetPagination()),
  //   clearProjects: () => dispatch(clearProjects()),
});

export const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export type InjectedProps = PropsFromRedux & {
  navigate: NavigateFunction;
};

const withMappedStore = (UnwrappedComponent: ComponentType<InjectedProps>) => {
  function WithMappedStore(props: PropsFromRedux) {
    const navigate = useNavigate();
    return <UnwrappedComponent navigate={navigate} {...props} />;
  }
  return WithMappedStore;
};

export default withMappedStore;
