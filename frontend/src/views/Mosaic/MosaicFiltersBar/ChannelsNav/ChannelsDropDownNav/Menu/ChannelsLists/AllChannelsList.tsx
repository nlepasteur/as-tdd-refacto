// types
import type { ComponentType } from 'react';
import type { InjectedProps as PropsFromWithSetter } from '../../../withSetter';
import type { InjectedProps as PropsFromWithToggle } from 'HOCs/withToggle';
// libs
import { nanoid } from 'nanoid';
// HOCs
import withToggle from 'HOCs/withToggle';
// components
import ChannelItem from '../ChannelItem';

type InjectedProps = Pick<PropsFromWithSetter, 'channels' | 'followChannel'> &
  PropsFromWithToggle & {
    children: (args: PropsFromWithToggle['toggle']) => JSX.Element;
    followedLength: number;
  };

const AllChannelsList: ComponentType<InjectedProps> = ({
  toggle,
  show,
  channels,
  followChannel,
  children,
  followedLength,
}) => {
  console.log('show: ', show);
  return (
    <div>
      {children(toggle)}
      {!show ? (
        <ul>
          {channels.map((channel) => (
            <li key={nanoid()}>
              <ChannelItem
                channel={channel}
                followChannel={followChannel}
                followedLength={followedLength}
              />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default withToggle(AllChannelsList);
