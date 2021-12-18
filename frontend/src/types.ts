export type { BtnProps } from './components/Btn';

export type FetchStatus = 'init' | 'fetching' | 'failure' | 'success';

export type GetRequestStatus<S extends string> = `GET_${Uppercase<S>}_${
  | 'INIT'
  | 'FETCHING'
  | 'FAILURE'
  | 'SUCCESS'}`;

export type FetchState<D> = {
  status: 'init' | 'fetching' | 'failure' | 'success';
  error: null | string;
  data: D[];
};

export type FetchFetching<S extends string> = {
  type: Exclude<
    GetRequestStatus<S>,
    `GET_${Uppercase<S>}_FAILURE` | `GET_${Uppercase<S>}_SUCCESS`
  >;
};

export type FetchFailure<S extends string> = {
  type: Exclude<
    GetRequestStatus<S>,
    | `GET_${Uppercase<S>}_INIT`
    | `GET_${Uppercase<S>}_FETCHING`
    | `GET_${Uppercase<S>}_SUCCESS`
  >;
  payload: string;
};

export type FetchSuccess<D, S extends string> = {
  type: Exclude<
    GetRequestStatus<S>,
    | `GET_${Uppercase<S>}_INIT`
    | `GET_${Uppercase<S>}_FETCHING`
    | `GET_${Uppercase<S>}_FAILURE`
  >;
  payload: D[];
};

export type FetchAction<D, S extends string> =
  | FetchFetching<S>
  | FetchFailure<S>
  | FetchSuccess<D, S>;

export interface GetFetching<S extends string> {
  (): FetchFetching<S>;
}

export interface GetFailure<S extends string> {
  (payload: string): FetchFailure<S>;
}

export interface GetSuccess<D, S extends string> {
  (payload: D[]): FetchSuccess<D, S>;
}

export type GenericGetRequestStatus =
  | 'INIT'
  | 'FETCHING'
  | 'FAILURE'
  | 'SUCCESS';

export type GenericFetchFetching = {
  type: Exclude<GenericGetRequestStatus, 'FAILURE' | 'SUCCESS'>;
};

export type GenericFetchFailure = {
  type: Exclude<GenericGetRequestStatus, 'INIT' | 'FETCHING' | 'SUCCESS'>;
  payload: string;
};

export type GenericFetchSuccess<D> = {
  type: Exclude<GenericGetRequestStatus, 'INIT' | 'FETCHING' | 'FAILURE'>;
  payload: D[];
};

export type GenericFetchAction<D> =
  | GenericFetchFetching
  | GenericFetchFailure
  | GenericFetchSuccess<D>;

export interface GenericGetFetching {
  (): GenericFetchFetching;
}

export interface GenericGetFailure {
  (payload: string): GenericFetchFailure;
}

export interface GenericGetSuccess<D> {
  (payload: D[]): GenericFetchSuccess<D>;
}

export type PartialFetchState = {
  status: FetchStatus;
  error: null | string;
};

export type PartialFetchStateAction =
  | { type: 'FETCHING' }
  | { type: 'FAILURE'; payload: string }
  | { type: 'SUCCESS' };

export type PartialUser = {
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

export type CompleteUser = PartialUser & {
  blocked: boolean;
  followed: boolean;
  following_back: boolean;
  headline: string;
  large_avatar_url: string;
  permalink: string;
  small_cover_url: string;
  followers_count: number;
  projects_count: number;
};

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

export type PartialProject = {
  title: string;
  user: PartialUser;
  hide_as_adult: boolean;
  id: string;
};

export type CompleteProject = {
  title: string;
  hide_as_adult: boolean;
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
  collections: Collection[];
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
  user: CompleteUser;
};

export type Project = PartialProject | CompleteProject | null;

export type Collection = {
  active_projects_count: number;
  id: string;
  is_private: boolean;
  micro_square_image_url: string;
  name: string;
  projects_count: number;
  small_square_image_url: string;
  user_id: string;
};

export type Following = {
  created_at: string;
  followee_id: string;
  follower_id: string;
  id: string;
  updated_at: string;
};

export type Vote = {
  created_at: string;
  id: string;
  user_id: string;
  votable_id: string;
  votable_type: string;
  user: CompleteUser;
};

export type Like = Vote & {
  user: {
    followed: boolean;
    followers_count: number;
    full_name: string;
    headline: string;
    id: string;
    medium_avatar_url: string;
    plus_member: boolean;
    pro_member: boolean;
    projects_count: number;
    username: string;
  };
};
