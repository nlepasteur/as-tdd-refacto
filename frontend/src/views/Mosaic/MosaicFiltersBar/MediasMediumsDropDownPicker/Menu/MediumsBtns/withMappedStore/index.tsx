// types
import type { ComponentType } from 'react';
import type { ConnectedProps } from 'react-redux';
import type { Medium, RootState } from 'application/types';
// libs
import { connect } from 'react-redux';
import { useEffect } from 'react';
// action creators
import { getMediums, updatePickedMediums } from 'application/actions/mediums';
import { clearProjects } from 'application/actions/projects';
import { resetPage } from 'application/actions/page';

const mapState = ({ mediums, mediumsState }: RootState) => ({
  pickedMediums: mediums,
  mediums: mediumsState.data,
});

const mapDispatch = (dispatch: any) => ({
  getMediums: () => dispatch(getMediums()),
  updatePickedMediums: (medium: string) =>
    dispatch(updatePickedMediums(medium)),
  clearProjects: () => dispatch(clearProjects()),
  resetPage: () => dispatch(resetPage()),
});

export const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export type InjectedProps = Omit<PropsFromRedux, 'getMediums'> & {
  mediums: Medium[];
};

const withMappedStore = (UnwrappedComponent: ComponentType<InjectedProps>) => {
  const WithMappedStore = ({ getMediums, ...props }: PropsFromRedux) => {
    useEffect(() => {
      if (!props.mediums.length) {
        getMediums();
      }
    }, [getMediums, props.mediums]);
    return <UnwrappedComponent {...props} />;
  };

  return WithMappedStore;
};

export default withMappedStore;
