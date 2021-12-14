// types
import type { ComponentType, Dispatch } from 'react';
import type { Vote, FetchState, GenericFetchAction } from '@types';
// libs
import { useEffect, useReducer } from 'react';

type OwnProps = {
  votable_id: string;
  toggleLikesModal: () => void;
}; // ajouter fn pour close modal LikesModal

type State = { likes: Vote[] };

export type InjectedProps = State & Pick<OwnProps, 'toggleLikesModal'>;

const initialState = {
  status: 'init',
  error: null,
  data: [] as Vote[],
} as const;

const reducer = (
  state: FetchState<Vote> = initialState,
  action: GenericFetchAction<Vote>
): FetchState<Vote> => {
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

const withVotes = (UnwrappedComponent: ComponentType<InjectedProps>) => {
  const WithVotes = ({ votable_id, ...props }: OwnProps) => {
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
  return WithVotes;
};

export default withVotes;

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
