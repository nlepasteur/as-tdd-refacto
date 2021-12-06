// types
import type { ComponentType, Dispatch } from 'react';
import type { CompleteUser, GenericFetchAction, FetchState } from '@types';
import type { RootState } from 'application/types';
// libs
import { useReducer, useEffect } from 'react';
import { connect } from 'react-redux';

const mapState = ({ isLogged }: RootState) => ({
  isLogged,
});

export const connector = connect(mapState);

type PropsFromRedux = ReturnType<typeof mapState>;

export type Comment = {
  commentable_id: string;
  created_at: string;
  hidden_by_user: boolean;
  id: string;
  liked: boolean;
  likes_count: number;
  parent_id: null | string;
  text: string;
  text_as_html: string;
  user: CompleteUser;
  user_id: string;
  child_comments: Comment[];
};

const initialState = {
  status: 'init',
  error: null,
  data: [] as Comment[],
} as const;

type Vote = {
  created_at: string;
  id: string;
  user_id: string;
  votable_id: string;
  votable_type: string;
  user: CompleteUser;
};

type UpdateCommentAction = {
  type: 'UPDATE_LIKES';
  payload: Vote['votable_id'];
};

export const updateCommentLikes = (
  state: FetchState<Comment>,
  votable_id: string
) => {
  const updatedComment = state.data.find(
    (comment) => comment.id === votable_id
  ) as Comment;
  const othersComments = state.data.filter(
    (comment) => comment.id !== votable_id
  );
  return {
    ...state,
    data: [
      ...othersComments,
      {
        ...updatedComment,
        likes_count: updatedComment.likes_count + 1,
        liked: !updatedComment.liked,
      },
    ],
  };
};

const reducer = (
  state: FetchState<Comment> = initialState,
  action: GenericFetchAction<Comment> | UpdateCommentAction
): FetchState<Comment> => {
  switch (action.type) {
    case 'FETCHING':
      return { status: 'fetching', error: null, data: [] };
    case 'FAILURE':
      return {
        status: 'failure',
        error: action.payload,
        data: [],
      };
    case 'SUCCESS':
      return {
        status: 'success',
        error: null,
        data: action.payload,
      };
    case 'UPDATE_LIKES':
      return updateCommentLikes(state, action.payload);
    default:
      return state;
  }
};

export type InjectedProps = {
  comments: Comment[];
  dispatchLocally: Dispatch<GenericFetchAction<Comment> | UpdateCommentAction>;
} & PropsFromRedux;

const withComments = (UnwrappedComponent: ComponentType<InjectedProps>) => {
  const WithComments = (props: PropsFromRedux) => {
    const [{ data: comments }, dispatch] = useReducer(reducer, initialState);
    console.log('COMMENTS: ', comments);
    // const { data: comments } = useFetch<Comment>('');
    useEffect(() => {
      (async function () {
        try {
          // http fetch request
          dispatch({ type: 'SUCCESS', payload: makeStubComments(10) });
        } catch (e) {
          // handle error
        }
      })();
    }, []);

    return (
      <UnwrappedComponent
        comments={comments}
        dispatchLocally={dispatch}
        {...props}
      />
    );
  };
  return WithComments;
};

export default withComments;

function makeStubComments(count: number) {
  const stubCommentBase = {
    child_comments: [],
    commentable_id: '',
    created_at: '',
    hidden_by_user: false,
    parent_id: '',
    text: '',
    text_as_html: '',
    user: {
      small_cover_url: '',
      medium_avatar_url: '',
      is_plus_member: false,
      is_school_account: false,
      is_staff: false,
      is_studio_account: false,
      pro_member: false,
      full_name: '',
      username: '',
      id: '',
      blocked: false,
      followed: false,
      following_back: false,
      headline: '',
      large_avatar_url: '',
      permalink: '',
    },
    user_id: '',
    liked: false,
    likes_count: 0,
  };
  return [...Array(count)].map((_, i) => ({
    ...stubCommentBase,
    id: String(i),
  }));
}
