// types
import type { ComponentType } from 'react';
import type { InjectedProps as PropsFromWithMappedStore } from '../withMappedStore';
// utils
import updateLocalStorage from 'utils/updateLocalStorage';
import updateStringPresenceDepending from 'utils/updateStringPresenceDepending';

export type InjectedProps = Omit<
  PropsFromWithMappedStore,
  'updatePickedMedias' | 'resetPage' | 'clearProjects'
> & {
  pickMedia(media: string): void;
};

const withSetter = (UnwrappedComponent: ComponentType<InjectedProps>) => {
  const WithSetter = ({
    updatePickedMedias,
    clearProjects,
    resetPage,
    ...props
  }: PropsFromWithMappedStore) => {
    const pickMedia: InjectedProps['pickMedia'] = (media) => {
      clearProjects();
      resetPage();
      updatePickedMedias(media);
      updateLocalStorage(
        'medias',
        updateStringPresenceDepending({
          initialString: props.pickedMedias,
          string: media,
        })
      );
    };
    return <UnwrappedComponent {...props} pickMedia={pickMedia} />;
  };
  const wrappedComponentName =
    UnwrappedComponent.displayName || UnwrappedComponent.name || 'Component';
  WithSetter.displayName = `withSetter(${wrappedComponentName})`;
  return WithSetter;
};

export default withSetter;
