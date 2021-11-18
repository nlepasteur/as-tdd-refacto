// types
import type { ComponentType } from 'react';
import type { InjectedProps as PropsFromWithMappedStore } from './withMappedStore';
// components
import withMappedStore, { connector } from './withMappedStore';
import Btn from 'components/Btn';

type InjectedProps = PropsFromWithMappedStore;

const Button: ComponentType<InjectedProps> = ({
  pickableCount,
  mediumsFetchStatus,
  toggle,
}) => (
  <Btn onClick={toggle}>
    {{
      text: 'All medias',
      sibling: pickableCount > 0 ? pickableCount : null,
    }}
  </Btn>
);
// disabled={mediumsFetchStatus !== 'success'}

export default connector(withMappedStore(Button));
