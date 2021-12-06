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

type Comment = {
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

type UpdateCommentAction = { type: 'UPDATE'; payload: Vote };

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
    case 'UPDATE':
      const updatedComment = state.data.find(
        (comment) => comment.id === action.payload.votable_id
      ) as Comment;
      const othersComments = state.data.filter(
        (comment) => comment.id !== action.payload.votable_id
      );
      return {
        ...state,
        data: [
          ...othersComments,
          {
            ...updatedComment,
            likes_count: updatedComment.likes_count + 1,
          },
        ],
      };
    default:
      return state;
  }
};

export type InjectedProps = {
  comments: Comment[];
  dispatch: Dispatch<GenericFetchAction<Comment>>;
} & PropsFromRedux;

const withComments = (UnwrappedComponent: ComponentType<InjectedProps>) => {
  const WithComments = (props: PropsFromRedux) => {
    const [{ data: comments }, dispatch] = useReducer(reducer, initialState);
    // const { data: comments } = useFetch<Comment>('');
    useEffect(() => {
      (async function () {
        try {
          // http fetch request
          // dispatch
        } catch (e) {
          // handle error
        }
      })();
    }, []);

    return (
      <UnwrappedComponent comments={comments} dispatch={dispatch} {...props} />
    );
  };
  return WithComments;
};

export default withComments;
