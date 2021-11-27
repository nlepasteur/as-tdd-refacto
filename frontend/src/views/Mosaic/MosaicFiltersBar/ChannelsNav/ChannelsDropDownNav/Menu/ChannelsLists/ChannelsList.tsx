// types
import type { ComponentType, ReactNode } from 'react';
import type { InjectedProps as PropsFromWithSetter } from '../../../withSetter';
// libs
import { nanoid } from 'nanoid';
// component
import ChannelItem from '../ChannelItem';

export type InjectedProps = Pick<
  PropsFromWithSetter,
  'followChannel' | 'channels'
> & { children: ReactNode; followedLength: number };

const ChannelsList: ComponentType<InjectedProps> = ({
  channels,
  followChannel,
  children,
  followedLength,
}) => {
  return (
    <div>
      {children}
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
    </div>
  );
};

export default ChannelsList;
