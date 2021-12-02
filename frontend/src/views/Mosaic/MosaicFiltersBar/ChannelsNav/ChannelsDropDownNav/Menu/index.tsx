// types
import type { ComponentType, ChangeEventHandler } from 'react';
import type { InjectedProps as PropsFromWithSetter } from '../../withSetter';
// libs
import { useState } from 'react';
// components
import AllChannelsList from './ChannelsLists/AllChannelsList';
import ChannelsList from './ChannelsLists/ChannelsList';

type FollowedChannels = { followedChannels: true };

export type InjectedProps = Omit<PropsFromWithSetter, 'error' | 'status'> &
  Partial<FollowedChannels>;

const ChannelsLists: ComponentType<InjectedProps> = ({
  channels,
  ...props
}) => {
  const [query, setQuery] = useState('');
  const handleQueryChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setQuery(e.target.value);
  };
  const queriedChannels = channels.filter((channel) =>
    RegExp(query).test(channel.name)
  );
  const followedChannels = channels.filter(
    (channel) => channel.favorite_position !== null
  );
  const sortedFollowedChannels = followedChannels.sort(
    (a, b) => (a.favorite_position as number) - (b.favorite_position as number)
  );
  return (
    <div className="channels-dropdown-nav__menu">
      <div>
        <input
          onChange={handleQueryChange}
          value={query}
          placeholder="Search in channels"
        />
        {query.length ? (
          <ChannelsList
            channels={queriedChannels}
            {...props}
            followedLength={followedChannels.length}
          >
            <div>
              {`${queriedChannels.length} result${
                queriedChannels.length > 1 ? 's' : ''
              }`}
            </div>
          </ChannelsList>
        ) : null}
        {props.isLogged ? (
          <ChannelsList
            channels={sortedFollowedChannels}
            {...props}
            followedChannels
            followedLength={followedChannels.length}
          >
            <div>Channels you follow</div>
          </ChannelsList>
        ) : null}
        <AllChannelsList
          channels={channels}
          {...props}
          followedLength={followedChannels.length}
        >
          {(toggle) => <button onClick={toggle}>All channels</button>}
        </AllChannelsList>
      </div>
    </div>
  );
};

export default ChannelsLists;
