// types
import type { ComponentType, Dispatch } from 'react';
import type { PartialFetchStateAction } from '@types';
import type { InjectedProps as PropsFromWithChannels } from '../withChannels';

const followChannel =
  (fetchChannels: PropsFromWithChannels['fetchChannels']) =>
  (dispatch: Dispatch<PartialFetchStateAction>) =>
  async (body: { channel_id: string; position?: number }) => {
    try {
      dispatch({ type: 'FETCHING' });
      await fetch(`/${body.position === undefined ? 'remove' : 'add'}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      dispatch({ type: 'SUCCESS' });
      fetchChannels();
    } catch (e: any) {
      dispatch({ type: 'FAILURE', payload: e.message });
    }
  };

export type InjectedProps = {
  followChannel: ReturnType<typeof followChannel>;
} & Omit<PropsFromWithChannels, 'fetchChannels'>;

const withSetters = (UnwrappedComponent: ComponentType<InjectedProps>) => {
  const WithSetters = ({ fetchChannels, ...props }: PropsFromWithChannels) => (
    <UnwrappedComponent
      {...props}
      followChannel={followChannel(fetchChannels)}
    />
  );
  return WithSetters;
};

export default withSetters;
