// types
import type { ComponentType, ChangeEventHandler } from 'react';
import type { InjectedProps as PropsFromWithSetter } from '../../withSetter';
// libs
import { useState } from 'react';
// components
import AllChannelsList from './ChannelsLists/AllChannelsList';
import ChannelsList from './ChannelsLists/ChannelsList';

export type InjectedProps = Omit<PropsFromWithSetter, 'error' | 'status'>;

const ChannelsLists: ComponentType<InjectedProps> = ({
  channels,
  followChannel,
  isLogged,
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
    <div>
      <input
        onChange={handleQueryChange}
        value={query}
        placeholder="Search in channels"
      />
      {query.length ? (
        <ChannelsList
          channels={queriedChannels}
          followChannel={followChannel}
          followedLength={followedChannels.length}
        >
          <div>{`${queriedChannels.length} results`}</div>
        </ChannelsList>
      ) : null}
      {isLogged ? (
        <ChannelsList
          channels={sortedFollowedChannels}
          followChannel={followChannel}
          followedLength={followedChannels.length}
        >
          <div>Channels you follow</div>
        </ChannelsList>
      ) : null}
      <AllChannelsList
        channels={channels}
        followChannel={followChannel}
        followedLength={followedChannels.length}
      >
        {(toggle) => <button onClick={toggle}>All channels</button>}
      </AllChannelsList>
    </div>
  );
};

export default ChannelsLists;
