// types
import type { ComponentType, Dispatch } from 'react';
import type { FetchState, GenericFetchAction } from '@types';
import type { RootState } from 'application/types';
// libs
import { useReducer, useEffect } from 'react';
import { connect } from 'react-redux';

export type Channel = {
  favorite_position: null | number;
  id: string;
  image_url: string;
  name: string;
  uri: string;
};

const initialState: FetchState<Channel> = {
  status: 'init',
  error: null,
  data: [],
};

function reducer(
  state: FetchState<Channel> = initialState,
  action: GenericFetchAction<Channel>
): FetchState<Channel> {
  switch (action.type) {
    case 'FETCHING':
      return { status: 'fetching', error: null, data: [] };
    case 'FAILURE':
      return { status: 'failure', error: action.payload, data: [] };
    case 'SUCCESS':
      return { status: 'success', error: null, data: action.payload };
    default:
      return state;
  }
}

const mapState = ({ isLogged }: RootState) => ({
  isLogged,
});

export const connector = connect(mapState);

type PropsFromRedux = ReturnType<typeof mapState>;

const fetchChannels =
  (dispatch: Dispatch<GenericFetchAction<Channel>>) => async () => {
    try {
      dispatch({ type: 'FETCHING' });
      // const response = await fetch('');
      // const payload = await response.json();
      // dispatch({ type: 'SUCCESS', payload: payload.data });
      const stubChannels: Channel[] = [
        {
          name: 'channel 1',
          uri: '',
          favorite_position: null,
          image_url: '',
          id: '0',
        },
        {
          name: 'channel 2',
          uri: '',
          favorite_position: 0,
          image_url: '',
          id: '1',
        },
      ];
      dispatch({ type: 'SUCCESS', payload: stubChannels });
    } catch (e: any) {
      dispatch({
        type: 'FAILURE',
        payload: e.message,
      });
    }
  };

export type InjectedProps = PropsFromRedux &
  Omit<FetchState<Channel>, 'data'> & {
    channels: Channel[];
    fetchChannels: ReturnType<typeof fetchChannels>;
  };

const withChannels = (UnwrappedComponent: ComponentType<InjectedProps>) => {
  function WithChannels(props: PropsFromRedux) {
    const [{ data: channels, ...fetchState }, dispatch] = useReducer(
      reducer,
      initialState
    );

    useEffect(() => {
      fetchChannels(dispatch)();
    }, []);

    return (
      <UnwrappedComponent
        {...props}
        {...fetchState}
        channels={channels}
        fetchChannels={fetchChannels(dispatch)}
      />
    );
  }

  return WithChannels;
};

export default withChannels;
