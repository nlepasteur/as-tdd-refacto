// types
import type { ComponentType } from 'react';
import type { FetchState } from '@types';
import type { RootState } from 'application/types';
// libs
import { connect } from 'react-redux';
import { useReducer, useEffect, useCallback } from 'react';
import { useLocation, useParams } from 'react-router';

const mapState = ({ isLogged }: RootState) => ({
  isLogged,
});

export const connector = connect(mapState);

type PropsFromRedux = ReturnType<typeof mapState>;

type PartialArtworkData = {
  //   icons: {
  //     image: boolean;
  //     video: boolean;
  //     video_clip: boolean;
  //     model_3d: boolean;
  //     marmoset: boolean;
  //     pano: boolean;
  //   };
  //   url: string;
  title: string;
  user: {
    medium_avatar_url: string;
    is_school_account: boolean;
    is_studio_account: boolean;
    is_plus_member: boolean;
    is_staff: boolean;
    pro_member: boolean;
    full_name: string;
    username: string;
    id: string;
  };
  //   smaller_square_cover_url: string;
  hide_as_adult: boolean;
  id: string;
};

type CompleteArtworkData = {
  // idem
  title: string;
  hide_as_adult: boolean;
  // idem
  admin_adult_content: boolean;
  adult_content: boolean;
  assets: {
    asset_type: string;
    has_embedded_player: boolean;
    has_image: boolean;
    height: number;
    id: string;
    image_url: string;
    oembed: null;
    player_embedded: null;
    position: number;
    title: null;
    title_formatted: string;
    viewport_constraint_type: 'constrained' | '';
    width: number;
  }[];
  categories: { name: string; id: string }[];
  collections: { name: string; id: string }[];
  comments_count: number;
  cover_url: string;
  created_at: string;
  description: string;
  description_html: string;
  editor_pick: boolean;
  hash_id: string;
  id: string;
  liked: boolean;
  likes_count: number;
  mediums: { name: string; id: string }[];
  medium: { name: string; id: string };
  permalink: string;
  published_at: string;
  slug: string;
  software_items: { name: string; id: string }[];
  suppressed: boolean;
  tags: string[];
  updated_at: string;
  user_id: string;
  views_count: number;
  visible: boolean;
  visible_on_artstation: boolean;
  // idem
  user: {
    medium_avatar_url: string;
    is_plus_member: boolean;
    is_school_account: boolean;
    is_studio_account: boolean;
    is_staff: boolean;
    pro_member: true;
    full_name: string;
    username: string;
    id: string;
    // idem
    blocked: boolean;
    followed: boolean;
    following_back: boolean;
    headline: string;
    large_avatar_url: string;
    permalink: string;
    small_cover_url: string;
  };
};

type ArtworkData = PartialArtworkData | CompleteArtworkData | null;

type ArtworkDataFetchState = Omit<FetchState<ArtworkData>, 'data'> & {
  data: ArtworkData;
};

export type InjectedProps = ArtworkDataFetchState &
  PropsFromRedux & { fetchArtworkData: (artworkId: string) => Promise<void> };

const withArtworkData = (UnwrappedComponent: ComponentType<InjectedProps>) => {
  const WithArtworkData = (props: PropsFromRedux) => {
    const { id } = useParams();
    const { state } = useLocation();
    const initialState = state ? state : null;
    const reducer = (
      state = initialState,
      action: { type: 'SUCCESS'; payload: CompleteArtworkData }
    ): ArtworkDataFetchState => {
      switch (action.type) {
        case 'SUCCESS':
          return { error: null, status: 'success', data: action.payload };
        default:
          return state;
      }
    };
    const [artworkDataFetchState, dispatch] = useReducer(reducer, initialState);

    const fetchArtworkData = useCallback(async (artworkId: string) => {
      try {
        const response = await fetch(`/projects/${artworkId}`);
        const data = await response.json();
        dispatch({
          type: 'SUCCESS',
          payload: data,
        });
      } catch (e) {
        // handle error
      }
    }, []);

    useEffect(() => {
      fetchArtworkData(id as string);
    }, [id, fetchArtworkData]);

    return (
      <UnwrappedComponent
        {...props}
        fetchArtworkData={fetchArtworkData}
        {...artworkDataFetchState}
      />
    );
  };
  return WithArtworkData;
};

export default withArtworkData;
