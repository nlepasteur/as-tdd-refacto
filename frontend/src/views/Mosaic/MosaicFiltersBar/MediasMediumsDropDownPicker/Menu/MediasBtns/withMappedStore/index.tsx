// types
import type { ComponentType } from 'react';
import type { ConnectedProps } from 'react-redux';
import type { RootState, AppDispatch, Media } from 'application/types';
// libs
import { connect } from 'react-redux';
// action creators
import { updatePickedMedias } from 'application/actions/medias';
import { clearProjects } from 'application/actions/projects';
import { resetPage } from 'application/actions/page';

const mapState = ({ medias }: RootState) => ({
  pickedMedias: medias,
});

const mapDispatch = (dispatch: AppDispatch) => ({
  updatePickedMedias: (media: string) => dispatch(updatePickedMedias(media)),
  clearProjects: () => dispatch(clearProjects()),
  resetPage: () => dispatch(resetPage()),
});

export const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export type InjectedProps = PropsFromRedux & { medias: Media[] };

const withMappedStore = (UnwrappedComponent: ComponentType<InjectedProps>) => {
  const WithMappedStore = (props: PropsFromRedux & { medias: Media[] }) => (
    <UnwrappedComponent {...props} />
  );
  const wrappedComponentName =
    UnwrappedComponent.displayName || UnwrappedComponent.name || 'Component';
  WithMappedStore.displayName = `withMappedStore(${wrappedComponentName})`;
  return WithMappedStore;
};

export default withMappedStore;
