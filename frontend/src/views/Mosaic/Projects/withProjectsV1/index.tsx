// types
import type { ComponentType } from 'react';
import type { ConnectedProps } from 'react-redux';
import type { Location } from 'react-router-dom';
import type { RootState, AppThunkDispatch, Dimension } from 'application/types';
import type { InjectedProps as PropsFromWithSpecificExplore } from '../withSpecificExplore';
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
  mediums,
  medias,
  dimension,
  grid,
  page,
  shuffledProjects,
}: RootState) => ({
  ...rest,
  projects,
  shuffledProjects,
  page,
  pickedMediums: mediums,
  pickedMedias: medias,
  dimension,
  currentGridSize: grid,
});

const mapDispatch = (dispatch: AppThunkDispatch) => ({
  getProjects: (url: string) => dispatch(getProjects(url)),
});

export const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export type InjectedProps = Omit<
  PropsFromWithSpecificExplore,
  'isExplore' | 'isChannel'
> &
  Pick<PropsFromRedux, 'projects' | 'status' | 'error' | 'currentGridSize'> & {
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

const determineRoute = (
  ...routes: { [key: string]: boolean | undefined }[]
) => {
  return routes
    .filter((route) => {
      const [value] = Object.values(route);
      return value;
    })
    .reduce((acc, cur) => {
      const [key] = Object.keys(cur);
      return acc + key;
    }, '') as any as ExploreRoute;
};

const withMappedStore = (UnwrappedComponent: ComponentType<InjectedProps>) => {
  const WithMappedStore = ({
    pickedMedias,
    pickedMediums,
    dimension,
    page,
    getProjects,
    isExplore,
    isChannel,
    // projects,
    shuffledProjects,
    ...props
  }: PropsFromWithSpecificExplore & PropsFromRedux) => {
    const location = useLocation();
    useEffect(() => {
      if (
        !/artwork/.test(location.pathname) &&
        props.projects.length !== 100 * page
      ) {
        const url = createUrl({
          medias: pickedMedias,
          mediums: pickedMediums,
          dimension,
          perPage: 100,
          page: 1,
          route: isChannel
            ? 'channels'
            : determineRoute(
                { community: props.community },
                { trending: props.trending },
                { latest: props.latest },
                { following: props.following }
              ),
        });
        getProjects(url);
      }
    }, [
      pickedMedias,
      pickedMediums,
      dimension,
      page,
      getProjects,
      isExplore,
      isChannel,
      props.community,
      props.trending,
      props.latest,
      props.following,
      location.pathname,
      props.projects.length,
    ]);
    return (
      <UnwrappedComponent
        {...props}
        // projects={props.community ? shuffledProjects : projects}
        location={location}
      />
    );
  };
  return WithMappedStore;
};

export default withMappedStore;
