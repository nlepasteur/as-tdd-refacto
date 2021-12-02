// types
import { ComponentType, useEffect } from 'react';
import type { InjectedProps as PropsFromWithToggle } from 'HOCs/withToggle';
import type { InjectedProps as PropsFromWithSetter } from '../withSetter';
// libs
import { useRef } from 'react';
// hooks
import useOnClickOutside from 'hooks/useOnClickOutside';
// components
import withChannels, { connector } from '../withChannels';
import withSetter from '../withSetter';
import withToggle from 'HOCs/withToggle';
import Btn from 'components/Btn';
import Menu from './Menu';
// style
import './ChannelsDropDownNav.css';

type InjectedProps = PropsFromWithToggle & PropsFromWithSetter;

const ChannelsDropDownNav: ComponentType<InjectedProps> = ({
  toggle,
  show,
  status,
  error,
  ...rest
}) => {
  const channelsDropDownNav = useRef(null);
  const onClickOutsideHandler = () => {
    if (show) {
      toggle();
    }
  };
  useOnClickOutside(channelsDropDownNav, onClickOutsideHandler);
  return (
    <div className="channels-dropdown-nav" ref={channelsDropDownNav}>
      <Btn
        className="channels-dropdown-nav__btn"
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
};

export default connector(
  withChannels(withSetter(withToggle(ChannelsDropDownNav)))
);
