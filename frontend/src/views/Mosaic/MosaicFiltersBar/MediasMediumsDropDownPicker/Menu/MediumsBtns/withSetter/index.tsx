// types
import type { ComponentType } from 'react';
import type { InjectedProps as PropsFromWithMappedStore } from '../withMappedStore';
// utils
import updateLocalStorage from 'utils/updateLocalStorage';
import updateStringPresenceDepending from 'utils/updateStringPresenceDepending';

export type InjectedProps = Omit<
  PropsFromWithMappedStore,
  'updatePickedMediums'
> & {
  pickMedium(medium: string): void;
};

const withSetter = (UnwrappedComponent: ComponentType<InjectedProps>) => {
  const WithSetter = ({
    updatePickedMediums,
    ...props
  }: PropsFromWithMappedStore) => {
    const pickMedium: InjectedProps['pickMedium'] = (medium) => {
      // + clear projects
      updatePickedMediums(medium);
      updateLocalStorage(
        'mediums',
        updateStringPresenceDepending({
          initialString: props.pickedMediums,
          string: medium,
        })
      );
    };

    return <UnwrappedComponent {...props} pickMedium={pickMedium} />;
  };
  return WithSetter;
};

export default withSetter;
