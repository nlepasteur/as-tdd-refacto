// types
import { ComponentType } from 'react';
import { RootState } from 'application/types';
import { InjectedProps as PropsFromWithToggle } from 'HOCs/withToggle';
// libs
import { connect } from 'react-redux';
// utils
import stringIntoArray from 'utils/stringIntoArray';

const mapState = ({
  mediums,
  medias,
  mediumsState: { status },
}: RootState) => ({
  pickableCount:
    stringIntoArray(medias).length + stringIntoArray(mediums).length,
  mediumsFetchStatus: status,
});

export const connector = connect(mapState);

type PropsFromRedux = ReturnType<typeof mapState>;

export type InjectedProps = PropsFromRedux & {
  toggle: PropsFromWithToggle['toggle'];
};

const withMappedStore = (UnwrappedComponent: ComponentType<InjectedProps>) => {
  function WithMappedStore(
    props: PropsFromRedux & { toggle: PropsFromWithToggle['toggle'] }
  ) {
    return <UnwrappedComponent {...props} />;
  }
  const wrappedComponentName =
    UnwrappedComponent.displayName || UnwrappedComponent.name || 'Component';
  WithMappedStore.displayName = `withMappedStore(${wrappedComponentName})`;

  return WithMappedStore;
};

export default withMappedStore;
