// types
import type { ComponentType } from 'react';
import type { ConnectedProps } from 'react-redux';
import type {
  FetchState,
  GenericFetchFetching,
  GenericFetchFailure,
  PartialProject,
  CompleteProject,
  Project,
  Collection,
} from '@types';
import type { RootState, AppDispatch, PopUpError } from 'application/types';
// libs
import { connect } from 'react-redux';
import { useReducer, useEffect, useCallback } from 'react';
import { useLocation, useParams } from 'react-router';
// action creators
import { toggleSignupSigninModal } from 'application/actions/showSignupSigninModal';
import { addPopUpError } from 'application/actions/popUpErrors';
// context
import ProjectContextProvider, {
  ProjectContext,
} from '../ProjectContextProvider';

const mapState = ({ isLogged }: RootState) => ({
  isLogged,
});

const mapDispatch = (dispatch: AppDispatch) => ({
  toggleSignupSigninModal: () => dispatch(toggleSignupSigninModal()),
  addPopUpError: (error: PopUpError) => dispatch(addPopUpError(error)),
});

export const connector = connect(mapState, mapDispatch);

export type PropsFromRedux = ConnectedProps<typeof connector>;

type ProjectFetchState = Omit<FetchState<Project>, 'data'> & { data: Project };

type OwnProps = object; // doit venir de props follow (puisque follow function utilisée partout dans app)

export type InjectedProps = ProjectFetchState &
  PropsFromRedux & {
    addCollection(collection: Collection): void;
  };

const addCollection = (
  state: Omit<FetchState<Project>, 'data'> & { data: CompleteProject },
  collection: Collection
) => {
  return {
    ...state,
    data: {
      ...state.data,
      collections: [...state.data.collections, collection], // on considère que ne peut être null puisque si addCollection call signifie que user est logged
    },
  };
};

type ProjectAction =
  | GenericFetchFailure
  | GenericFetchFetching
  | { type: 'SUCCESS'; payload: Project }
  | { type: 'ADD_COLLECTION'; payload: Collection };

const withProject = (UnwrappedComponent: ComponentType<InjectedProps>) => {
  const WithProject = (props: PropsFromRedux) => {
    const { id } = useParams();
    const { state } = useLocation() as { state: PartialProject };

    const initialState =
      state && 'data' in state
        ? ({
            status: 'init',
            error: null,
            data: state,
          } as ProjectFetchState)
        : ({
            status: 'init',
            error: null,
            data: null,
          } as ProjectFetchState);

    const reducer = (
      state: ProjectFetchState = initialState,
      action: ProjectAction
    ): ProjectFetchState => {
      switch (action.type) {
        case 'FETCHING':
          return { error: null, status: 'fetching', data: null };
        case 'FAILURE':
          return {
            status: 'failure',
            error: action.payload,
            data: null,
          };
        case 'SUCCESS':
          return { error: null, status: 'success', data: action.payload };
        case 'ADD_COLLECTION':
          return addCollection(
            state as Omit<FetchState<Project>, 'data'> & {
              data: CompleteProject;
            },
            action.payload
          );
        default:
          return state;
      }
    };

    const [projectFetchState, dispatch] = useReducer(reducer, initialState);
    console.log('project: ', projectFetchState.data);
    useEffect(() => {
      (async function () {
        try {
          dispatch({ type: 'FETCHING' });
          // const response = await fetch('/projects');
          // const project = (await response.json()) as CompleteProject;
          // dispatch({ type: 'SUCCESS', payload: project });
          dispatch({ type: 'SUCCESS', payload: makeStubProject() });
        } catch (e) {
          // handle error
        }
      })();
    }, [id]);

    return (
      <ProjectContextProvider>
        <UnwrappedComponent
          {...props}
          {...projectFetchState}
          addCollection={(collection: Collection) => {
            dispatch({ type: 'ADD_COLLECTION', payload: collection });
          }}
        />
      </ProjectContextProvider>
    );
  };
  return WithProject;
};

export default withProject;

function makeStubProject(): CompleteProject {
  return {
    title: 'stub project',
    hide_as_adult: false,
    admin_adult_content: false,
    adult_content: false,
    assets: [
      {
        asset_type: 'image',
        has_embedded_player: false,
        has_image: false,
        height: 1000,
        id: 'stubId',
        image_url: '',
        oembed: null,
        player_embedded: null,
        position: 1,
        title: null,
        title_formatted: 'stub project',
        viewport_constraint_type: 'constrained',
        width: 1000,
      },
    ],
    categories: [{ name: 'stub categorie', id: 'stubCategorieId' }],
    collections: [
      {
        active_projects_count: 1,
        id: 'stubCollectionId',
        is_private: false,
        micro_square_image_url: '',
        name: 'stub collection name',
        projects_count: 1,
        small_square_image_url: '',
        user_id: 'stubUserId',
      },
    ],
    comments_count: 0,
    cover_url: '',
    created_at: '',
    description: '',
    description_html: '',
    editor_pick: false,
    hash_id: '',
    id: 'stubProjectId',
    liked: false,
    likes_count: 0,
    mediums: [],
    medium: { name: '', id: '' },
    permalink: '',
    published_at: '',
    slug: '',
    software_items: [],
    suppressed: false,
    tags: [],
    updated_at: '',
    user_id: '',
    views_count: 0,
    visible: false,
    visible_on_artstation: false,
    user: {
      followers_count: 0,
      projects_count: 0,
      full_name: '',
      username: '',
      medium_avatar_url: '',
      small_cover_url: '',
      is_plus_member: false,
      is_school_account: false,
      is_staff: false,
      is_studio_account: false,
      pro_member: false,
      id: 'stubUserId',
      blocked: false,
      followed: false,
      following_back: false,
      headline: '',
      large_avatar_url: '',
      permalink: '',
    },
  };
}
