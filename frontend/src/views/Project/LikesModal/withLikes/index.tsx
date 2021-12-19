// types
import type { ComponentType } from 'react';
import type { Like, FetchState, GenericFetchAction } from '@types';
import type { InjectedProps as WithSettersProps } from '../withSetters';
// libs
import { useEffect, useReducer } from 'react';

export type InjectedProps = Omit<WithSettersProps, keyof WithSettersProps> & {
  votable_id: string;
  votable_type: 'comment' | 'project';
  toggleModal(): void;
};

const initialState = {
  status: 'init',
  error: null,
  data: [] as Like[],
} as const;

const reducer = (
  state: FetchState<Like> = initialState,
  action:
    | GenericFetchAction<Like>
    | {
        type: 'INVERT_LIKE_FOLLOWED';
        payload: string;
      }
): FetchState<Like> => {
  switch (action.type) {
    case 'FETCHING':
      return { status: 'fetching', error: null, data: [] };
    case 'FAILURE':
      return { status: 'failure', error: action.payload, data: [] };
    case 'SUCCESS':
      return { status: 'success', error: null, data: action.payload };
    case 'INVERT_LIKE_FOLLOWED':
      const updatedLike = state.data
        .filter((like) => like.user.id === action.payload)
        .map((like) => ({
          ...like,
          user: { ...like.user, followed: !like.user.followed },
        }));
      const othersLikes = state.data.filter(
        (like) => like.user.id !== action.payload
      );
      return { ...state, data: [...othersLikes, ...updatedLike] };
    default:
      return state;
  }
};

const withLikes = (
  UnwrappedComponent: ComponentType<Omit<WithSettersProps, 'ref'>>
) => {
  const WithLikes = ({
    votable_id,
    votable_type,
    toggleModal,
  }: InjectedProps) => {
    const [{ data: likes, status }, dispatch] = useReducer(
      reducer,
      initialState
    );
    const invertLikeFollowed = (followee_id: string) => {
      dispatch({ type: 'INVERT_LIKE_FOLLOWED', payload: followee_id });
    };
    useEffect(() => {
      (async function () {
        try {
          // const response = await fetch(
          //   `/votes?page=${1}&votable_id=${votable_id}&votable_type=${votable_type}`
          // );
          // const likes = (await response.json()) as Like[];
          // dispatch({ type: 'SUCCESS', payload: likes });
          dispatch({ type: 'SUCCESS', payload: makeStubLikes() });
        } catch (e) {
          // handle error
        }
      })();
    }, [votable_id]);
    return (
      <UnwrappedComponent
        likes={likes}
        status={status}
        invertLikeFollowed={invertLikeFollowed}
        toggleModal={toggleModal}
      />
    );
  };
  return WithLikes;
};

export default withLikes;

function makeStubLikes(): Like[] {
  return [
    {
      created_at: '',
      id: 'stubLikeId',
      user_id: '',
      votable_id: '',
      votable_type: '',
      user: {
        medium_avatar_url: '',
        small_cover_url: '',
        large_avatar_url: '',
        username: 'nico',
        full_name: 'nicolp',
        pro_member: false,
        is_studio_account: false,
        is_staff: false,
        is_plus_member: false,
        is_school_account: false,
        id: 'stubUserId',
        following_back: false,
        followed: false,
        followers_count: 157,
        blocked: false,
        permalink: '',
        headline: '',
        projects_count: 14,
        plus_member: false,
      },
    },
    {
      created_at: '',
      id: 'stubLikeId2',
      user_id: '',
      votable_id: '',
      votable_type: '',
      user: {
        medium_avatar_url: '',
        plus_member: false,
        small_cover_url: '',
        large_avatar_url: '',
        username: 'al',
        full_name: 'alt',
        pro_member: false,
        is_studio_account: false,
        is_staff: false,
        is_plus_member: false,
        is_school_account: false,
        id: 'stubUserId2',
        following_back: false,
        followed: false,
        followers_count: 45,
        blocked: false,
        permalink: '',
        headline: '',
        projects_count: 522,
      },
    },
  ];
}
