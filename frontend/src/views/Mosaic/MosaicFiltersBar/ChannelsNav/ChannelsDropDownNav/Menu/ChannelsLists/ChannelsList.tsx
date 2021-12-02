// types
import type { ComponentType, ReactNode } from 'react';
import type { InjectedProps as PropsFromMenu } from '../../Menu';
// libs
import { nanoid } from 'nanoid';
import classnames from 'classnames';
// utils
import createClasses from 'utils/createClasses';
// component
import ChannelItem from '../ChannelItem';

export type InjectedProps = Pick<
  PropsFromMenu,
  'followChannel' | 'channels' | 'isLogged' | 'followedChannels'
> & { children: ReactNode; followedLength: number };

const ChannelsList: ComponentType<InjectedProps> = ({
  channels,
  children,
  followedChannels,
  ...props
}) => {
  return (
    <div>
      {children}
      <ul
        className={classnames(
          createClasses(
            { followedChannels } as { [key: string]: boolean },
            'channels-list--'
          )
        )}
      >
        {channels.map((channel) => (
          <li key={nanoid()} className="channels-list__item">
            <ChannelItem channel={channel} {...props} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChannelsList;
