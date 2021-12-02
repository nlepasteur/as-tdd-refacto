// types
import type { ComponentType } from 'react';
import type { InjectedProps as PropsFromWithMappedStore } from './withMappedStore';
// components
import withMappedStore, { connector } from './withMappedStore';
import Btn from 'components/Btn';
// style
import './Button.css';

type InjectedProps = PropsFromWithMappedStore;

const Button: ComponentType<InjectedProps> = ({
  pickableCount,
  toggle,
  mediumsFetchStatus,
}) => (
  <Btn
    onClick={toggle}
    // disabled={mediumsFetchStatus !== 'success'}
    className="medias-mediums__toggle-btn"
  >
    {{
      text: 'All medias',
      sibling: pickableCount > 0 ? pickableCount : null,
    }}
  </Btn>
);

export default connector(withMappedStore(Button));
