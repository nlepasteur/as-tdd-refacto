// types
import { InjectedProps as ChannelItemProps } from 'views/Mosaic/MosaicFiltersBar/ChannelsNav/ChannelsDropDownNav/Menu/ChannelItem';
import { InjectedProps as ChannelsListProps } from 'views/Mosaic/MosaicFiltersBar/ChannelsNav/ChannelsDropDownNav/Menu/';
// libraries
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
// tested components
import ChannelItem from 'views/Mosaic/MosaicFiltersBar/ChannelsNav/ChannelsDropDownNav/Menu/ChannelItem';
import ChannelsList from 'views/Mosaic/MosaicFiltersBar/ChannelsNav/ChannelsDropDownNav/Menu';

describe('ChannelItem', () => {
  const baseStubInjectedProps: Omit<ChannelItemProps, 'followChannel'> = {
    isLogged: true,
    followedLength: 1,
    channel: {
      id: 'id',
      name: 'some channel',
      uri: '',
      favorite_position: 0,
      image_url: '',
    },
  };

  describe('ChannelItem is followed', () => {
    let called: { channel_id: string; position?: number };
    it('passes an object with "channel_id" as argument', () => {
      const mockedFollowChannel =
        () => async (body: { channel_id: string; position?: number }) => {
          called = body;
        };

      const { getByRole } = render(
        <ChannelItem
          followChannel={mockedFollowChannel}
          {...baseStubInjectedProps}
        />,
        { wrapper: MemoryRouter }
      );

      fireEvent.click(getByRole('button'));
      const expected = { channel_id: baseStubInjectedProps.channel.id };
      expect(called).toEqual(expected);
    });
  });

  describe('ChannelItem is not followed', () => {
    let called: { channel_id: string; position?: number };
    it('passes an object with "channel_id" and "position" as arguments', () => {
      const mockedFollowChannel =
        () => async (body: { channel_id: string; position?: number }) => {
          called = body;
        };
      const stubInjectedProps = {
        ...baseStubInjectedProps,
        channel: {
          ...baseStubInjectedProps.channel,
          favorite_position: null,
        },
      };
      const { getByRole } = render(
        <ChannelItem
          followChannel={mockedFollowChannel}
          {...stubInjectedProps}
        />,
        { wrapper: MemoryRouter }
      );
      fireEvent.click(getByRole('button'));
      const expected = {
        channel_id: stubInjectedProps.channel.id,
        position: stubInjectedProps.followedLength,
      };
      expect(called).toEqual(expected);
    });
  });
});

describe('ChannelsLists', () => {
  const baseStubInjectedProps: Omit<ChannelsListProps, 'isLogged'> = {
    channels: [
      {
        favorite_position: 0,
        id: '0',
        image_url: '',
        name: 'channel 1',
        uri: '',
      },
      {
        favorite_position: 1,
        id: '1',
        image_url: '',
        name: 'channel 2',
        uri: '',
      },
      {
        favorite_position: null,
        id: '2',
        image_url: '',
        name: 'channel 3',
        uri: '',
      },
    ],
    followChannel: jest.fn(),
  };
  describe('user is not logged', () => {
    it('displays "AllChannels"', () => {
      const { getByText } = render(
        <ChannelsList {...baseStubInjectedProps} isLogged={false} />,
        { wrapper: MemoryRouter }
      );
      expect(getByText(/all channels/i)).toBeInTheDocument();
    });

    it('does not display "Channels you follow"', () => {
      const { queryByText } = render(
        <ChannelsList {...baseStubInjectedProps} isLogged={false} />,
        { wrapper: MemoryRouter }
      );
      expect(queryByText(/channels you follow/i)).not.toBeInTheDocument();
    });
  });

  describe('user is logged', () => {
    it('displays "AllChannels"', () => {
      const { getByText } = render(
        <ChannelsList {...baseStubInjectedProps} isLogged={false} />,
        { wrapper: MemoryRouter }
      );
      expect(getByText(/all channels/i)).toBeInTheDocument();
    });

    it('does not display "Channels you follow"', () => {
      const { queryByText } = render(
        <ChannelsList {...baseStubInjectedProps} isLogged />,
        { wrapper: MemoryRouter }
      );
      expect(queryByText(/channels you follow/i)).toBeInTheDocument();
    });
  });

  describe('"Search in channels" input is empty', () => {
    it('number of results is not displayed', () => {
      const { queryByText } = render(
        <ChannelsList {...baseStubInjectedProps} isLogged />,
        { wrapper: MemoryRouter }
      );
      expect(queryByText(/\d+ results?/i)).not.toBeInTheDocument();
    });
  });

  describe('"Search in channels" input is not empty', () => {
    it('number of results is displayed', () => {
      const { queryByText, getByRole } = render(
        <ChannelsList {...baseStubInjectedProps} isLogged />,
        { wrapper: MemoryRouter }
      );
      fireEvent.change(getByRole('textbox'), {
        target: { value: 'any input' },
      });
      expect(queryByText(/\d+ results?/i)).toBeInTheDocument();
    });
  });
});
