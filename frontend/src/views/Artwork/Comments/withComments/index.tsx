// types
import type { ComponentType, Dispatch } from 'react';
import type { ConnectedProps } from 'react-redux';
import type { GenericFetchAction, FetchState, Comment, Vote } from '@types';
import type { RootState, AppDispatch } from 'application/types';
import type { ArtworkContextAction } from '../../ProjectContextProvider';
// libs
import { useReducer, useEffect } from 'react';
import { connect } from 'react-redux';
// action creators
import { toggleSignupSigninModal } from 'application/actions/showSignupSigninModal';

const mapState = ({ isLogged }: RootState) => ({
  isLogged,
});

const mapDispatch = (dispatch: AppDispatch) => ({
  toggleSignupSigninModal: () => dispatch(toggleSignupSigninModal()),
});

export const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

const initialState = {
  status: 'init',
  error: null,
  data: [] as Comment[],
} as const;

type UpdateCommentAction = {
  type: 'UPDATE_COMMENT_LIKES';
  payload: Vote['votable_id'];
};

export const updateCommentLikes = (
  state: FetchState<Comment>,
  votable_id: string
): FetchState<Comment> => {
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
    case 'UPDATE_COMMENT_LIKES':
      return updateCommentLikes(state, action.payload);
    default:
      return state;
  }
};

type OwnProps = { toggleLikesModal: Dispatch<ArtworkContextAction> }; // /!\ doit prendre aussi collection fetch depuis Project puisque
// pour empếcher l'ajout d'un project à une collection lorsque déjà présent
// ici sans doutes aussi like; comment; edit; delete puisque existent au sein de Artwork et pas seuleument de Comments };

export type InjectedProps = {
  comments: Comment[];
  updateCommentLikes(votableId: string): void;
} & PropsFromRedux &
  OwnProps;

const withComments = (UnwrappedComponent: ComponentType<InjectedProps>) => {
  const WithComments = (props: PropsFromRedux & OwnProps) => {
    const [{ data: comments }, dispatch] = useReducer(reducer, initialState);
    console.log('COMMENTS: ', comments);
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
        updateCommentLikes={(votableId: string) =>
          dispatch({ type: 'UPDATE_COMMENT_LIKES', payload: votableId })
        }
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
      projects_count: 0,
      followers_count: 0,
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
