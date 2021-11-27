// types
import type { ComponentType } from 'react';
import type { InjectedProps as PropsFromWithToggle } from 'HOCs/withToggle';
import type { InjectedProps as PropsFromWithSetter } from '../withSetter';
// components
import withChannels, { connector } from '../withChannels';
import withSetter from '../withSetter';
import withToggle from 'HOCs/withToggle';
import Btn from 'components/Btn';
import Menu from './Menu';

type InjectedProps = PropsFromWithToggle & PropsFromWithSetter;

const ChannelsDropDownNav: ComponentType<InjectedProps> = ({
  toggle,
  show,
  status,
  error,
  ...rest
}) => (
  <div>
    <Btn
      onClick={toggle}
      disabled={status !== 'success' && !rest.channels.length}
    >
      {{
        text: 'Channels',
      }}
    </Btn>
    {show ? <Menu {...rest} /> : null}
  </div>
);

export default connector(
  withChannels(withSetter(withToggle(ChannelsDropDownNav)))
);
