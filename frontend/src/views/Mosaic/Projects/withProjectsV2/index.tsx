// types
import type { ComponentType } from 'react';
import type { ConnectedProps } from 'react-redux';
import type { Location } from 'react-router-dom';
import type { RootState, AppThunkDispatch, Dimension } from 'application/types';
// libs
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
// action creators
import { getProjects } from 'application/actions/projects';
// utils
import createQueryString from 'utils/createQueryString';

const mapState = ({
  projectsState: { data: projects, ...rest },
  shuffledProjects,
  mediums,
  medias,
  dimension,
  grid,
  page,
  explore,
}: RootState) => ({
  ...rest,
  projects,
  shuffledProjects,
  page,
  pickedMediums: mediums,
  pickedMedias: medias,
  dimension,
  currentGridSize: grid,
  explore,
});

const mapDispatch = (dispatch: AppThunkDispatch) => ({
  getProjects: (url: string) => dispatch(getProjects(url)),
});

export const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export type InjectedProps = Pick<
  PropsFromRedux,
  'projects' | 'status' | 'error' | 'currentGridSize' | 'explore'
> & {
  location: Location;
};

type ExploreRoute = 'community' | 'trending' | 'latest' | 'following';
type ChannelRoute = 'channels';
type Route = ExploreRoute | ChannelRoute;

const createUrl = ({
  route,
  medias,
  mediums,
  dimension,
  page,
  perPage,
}: {
  route: Route;
  medias: string;
  mediums: string;
  dimension: Dimension;
  page: number;
  perPage: number;
}) => {
  const routes = {
    community: '/explore/projects/community',
    trending: '/explore/projects/trending',
    latest: '/explore/projects/latest',
    following: '/explore/projects/following',
    channels: '/channels',
  };
  return `${
    routes[route]
  }?page=${page}&dimension=${dimension}&per_page=${perPage}${
    mediums.length
      ? createQueryString({ query: 'medium_ids', values: mediums })
      : ''
  }${
    medias.length
      ? createQueryString({ query: 'asset_types', values: medias })
      : ''
  }`;
};

const withMappedStore = (UnwrappedComponent: ComponentType<InjectedProps>) => {
  const WithMappedStore = ({
    pickedMedias,
    pickedMediums,
    dimension,
    page,
    getProjects,
    projects,
    shuffledProjects,
    ...props
  }: PropsFromRedux) => {
    const location = useLocation();
    useEffect(() => {
      if (
        !/artwork/.test(location.pathname) &&
        projects.length !== 100 * page
      ) {
        const url = createUrl({
          medias: pickedMedias,
          mediums: pickedMediums,
          dimension,
          perPage: 100,
          page: 1,
          route: /channels/.test(location.pathname)
            ? 'channels'
            : props.explore,
        });
        getProjects(url);
      }
    }, [
      props.explore,
      pickedMedias,
      pickedMediums,
      dimension,
      page,
      getProjects,
      location.pathname,
      location.search,
      projects.length,
    ]);
    return (
      <UnwrappedComponent
        projects={props.explore === 'community' ? shuffledProjects : projects}
        {...props}
        location={location}
      />
    );
  };
  return WithMappedStore;
};

export default withMappedStore;
