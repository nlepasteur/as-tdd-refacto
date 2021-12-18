// types
import type { ComponentType } from 'react';
import type { Like, FetchState, GenericFetchAction } from '@types';
import type { InjectedProps as LikesProps } from '../Likes';
// libs
import { useEffect, useReducer } from 'react';

type InjectedProps = { votable_id: string };

const initialState = {
  status: 'init',
  error: null,
  data: [] as Like[],
} as const;

const reducer = (
  state: FetchState<Like> = initialState,
  action: GenericFetchAction<Like>
): FetchState<Like> => {
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
};

const withLikes = (UnwrappedComponent: ComponentType<LikesProps>) => {
  const WithLikes = ({ votable_id }: InjectedProps) => {
    const [{ data: votes }, dispatch] = useReducer(reducer, initialState);
    console.log('votes: ', votes);
    useEffect(() => {
      (async function () {
        try {
          // const response = await fetch('');
          // const Votes = (await response.json()) as Vote[];
          // dispatch({ type: 'SUCCESS', payload: Votes });
          dispatch({ type: 'SUCCESS', payload: makeStubLikes() });
        } catch (e) {
          // handle error
        }
      })();
    }, [votable_id]);
    return <UnwrappedComponent likes={votes} {...props} />;
  };
  return WithLikes;
};

export default withLikes;

function makeStubLikes(): Vote[] {
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
