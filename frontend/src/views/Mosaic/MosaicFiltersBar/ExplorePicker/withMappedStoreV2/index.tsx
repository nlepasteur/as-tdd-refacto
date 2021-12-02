// types
import type { ComponentType } from 'react';
import type { RootState } from 'application/store';
// libs
import { connect } from 'react-redux';

const mapState = ({ isLogged, dimension, explore }: RootState) => ({
  isLogged,
  currentDimension: dimension,
  // éventuellement "explore" sera enlevé pour tenir compte de query string à la place (pas "dimension" puisque ne peut pas être modifié depuis ExplorePicker)
  currentExplore: explore,
});

export const connector = connect(mapState);

type PropsFromRedux = ReturnType<typeof mapState>;

export type InjectedProps = PropsFromRedux;

const withMappedStore = (UnwrappedComponent: ComponentType<InjectedProps>) => {
  function WithMappedStore(props: PropsFromRedux) {
    return <UnwrappedComponent {...props} />;
  }

  const wrappedComponentName =
    UnwrappedComponent.displayName || UnwrappedComponent.name || 'Component';
  WithMappedStore.displayName = `withMappedStore(${wrappedComponentName})`;

  return WithMappedStore;
};

export default withMappedStore;
