// types
import type { ComponentType } from 'react';
import type { InjectedProps as PropsFromMenu } from '../../Menu';
import type { InjectedProps as PropsFromWithToggle } from 'HOCs/withToggle';
// libs
import classnames from 'classnames';
import { nanoid } from 'nanoid';
// HOCs
import withToggle from 'HOCs/withToggle';
// utils
import createClasses from 'utils/createClasses';
// components
import ChannelItem from '../ChannelItem';

type InjectedProps = Pick<
  PropsFromMenu,
  'channels' | 'followChannel' | 'isLogged' | 'followedChannels'
> &
  PropsFromWithToggle & {
    children: (args: PropsFromWithToggle['toggle']) => JSX.Element;
    followedLength: number;
  };

const AllChannelsList: ComponentType<InjectedProps> = ({
  toggle,
  show,
  channels,
  children,
  followedChannels,
  ...props
}) => {
  return (
    <div>
      {children(toggle)}
      {!show ? (
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
      ) : null}
    </div>
  );
};

export default withToggle(AllChannelsList);
