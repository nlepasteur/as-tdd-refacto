// types
import type { MouseEventHandler } from 'react';
import type { PartialFetchState, PartialFetchStateAction } from '@types';
import type { Channel } from '../../../withChannels';
import type { InjectedProps as PropsFromChannelsList } from '..';
// libs
import { useReducer } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
// icons
import { BiGridVertical } from 'react-icons/bi';
import { FiCheck } from 'react-icons/fi';
import { HiOutlinePlus } from 'react-icons/hi';
import { IoCloseOutline } from 'react-icons/io5';

export type InjectedProps = Pick<PropsFromChannelsList, 'followChannel'> & {
  channel: Channel;
  followedLength: number;
};

const initialState: PartialFetchState = {
  status: 'init',
  error: null,
};

const reducer = (
  state: PartialFetchState = initialState,
  action: PartialFetchStateAction
): PartialFetchState => {
  switch (action.type) {
    case 'FETCHING':
      return { status: 'fetching', error: null };
    case 'FAILURE':
      return { status: 'failure', error: action.payload };
    case 'SUCCESS':
      return { status: 'success', error: null };
    default:
      return state;
  }
};

const ChannelItem = ({
  channel,
  followChannel,
  followedLength,
}: InjectedProps) => {
  const [{ status }, dispatch] = useReducer(reducer, initialState);
  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    const body =
      channel.favorite_position === null
        ? { channel_id: channel.id, position: followedLength }
        : { channel_id: channel.id };
    followChannel(dispatch)(body);
  };

  return (
    <Link to={`/channels/${channel.uri}`}>
      <div
        className={classnames(
          'channel-grid',
          channel.favorite_position !== null && 'channel-grid--followed'
        )}
      >
        <img
          src={channel.image_url}
          alt={channel.name}
          className="channel-grid__item"
        />
        <div className="channel-grid__item channel-overlay">
          <div className="channel-overlay__move">
            <BiGridVertical />
          </div>
          <div className="channel-overlay__name">{channel.name}</div>
          <button
            className={classnames(
              'channel-overlay__follow',
              status === 'fetching' && 'channel-overlay__follow--fetching'
            )}
            onClick={handleClick}
          >
            <div className="follow-status follow-status__followed">
              <FiCheck />
            </div>
            <div className="follow-status follow-status__unfollow">
              <IoCloseOutline />
            </div>
            <div className="follow-status follow-status__follow">
              <HiOutlinePlus />
            </div>
            <div className="follow-status follow-status__fetching">F!</div>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ChannelItem;
