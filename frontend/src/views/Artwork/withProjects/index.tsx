// types
import type { ComponentType } from 'react';
import type { ConnectedProps } from 'react-redux';
import type { PartialProject, Project } from '@types';
import type { AppDispatch, PopUpError } from 'application/types';
import type { InjectedProps as ProjectProps } from '../Project';
// libs
import { useContext, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
// context
import { ProjectContext } from '../ProjectContextProvider';
// action creators
import { addPopUpError } from 'application/actions/popUpErrors';

const mapDispatch = (dispatch: AppDispatch) => ({
  addPopUpError: (popUpError: PopUpError) => {
    dispatch(addPopUpError(popUpError));
  },
});

export const connector = connect(null, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export type InjectedProps = PropsFromRedux;

const withProject = (UnwrappedComponent: ComponentType<ProjectProps>) => {
  const WithProject = ({ addPopUpError }: InjectedProps) => {
    const { id } = useParams();
    const { state } = useLocation() as {
      state: { partialProject: PartialProject };
    };
    const {
      setProjectFetchState,
      showAddToCollectionModal,
      updateProjectCollections,
      toggleAddToCollectionModal,
      projectFetchState: { data, status },
      ...rest
    } = useContext(ProjectContext);
    const project: Project = data
      ? data
      : state && 'partialProject' in state
      ? state.partialProject
      : null;

    useEffect(() => {
      (async function () {
        try {
          // const response = await fetch(`/projects/${id}`);
          // const project = await response.json();
          // setProject(project);
          setProjectFetchState({ type: 'SUCCESS', payload: makeStubProject() });
        } catch (e) {
          // handle errors
        }
      })();
    }, [id]);

    return (
      <UnwrappedComponent
        updateProjectCollections={updateProjectCollections}
        toggleAddToCollectionModal={toggleAddToCollectionModal}
        addPopUpError={addPopUpError}
        project={project}
        showAddToCollectionModal={showAddToCollectionModal}
      />
    );
  };
  return WithProject;
};

export default withProject;

function makeStubProject() {
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
