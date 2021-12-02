// types
import type { ComponentType } from 'react';
import type { ConnectedProps } from 'react-redux';
import type { Location } from 'react-router-dom';
import type { RootState, Explore, Dimension } from 'application/types';
// libs
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
// action creators
import { setExplore } from 'application/actions/explore';
import { setDimension } from 'application/actions/dimension';
import { getProjects } from 'application/actions/projects';
// utils
import createQueryString from 'utils/createQueryString';
import updateLocalStorage from 'utils/updateLocalStorage';

const mapState = ({
  projectsState: { data: projects, ...rest },
  shuffledProjects,
  explore,
  dimension,
  mediums,
  medias,
  page,
  grid,
}: RootState) => ({
  ...rest,
  projects,
  shuffledProjects,
  explore,
  dimension,
  pickedMediums: mediums,
  pickedMedias: medias,
  page,
  currentGridSize: grid,
});

const mapDispatch = (dispatch: any) => ({
  getProjects: (url: string) => dispatch(getProjects(url)),
  setExplore: (explore: Explore) => dispatch(setExplore(explore)),
  setDimension: (dimension: Dimension) => dispatch(setDimension(dimension)),
});

export const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export type InjectedProps = Pick<
  PropsFromRedux,
  'projects' | 'status' | 'error' | 'explore'
> &
  Partial<Pick<PropsFromRedux, 'currentGridSize' | 'shuffledProjects'>> & {
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
    getProjects,
    shuffledProjects,
    setExplore,
    setDimension,
    dimension,
    pickedMedias,
    pickedMediums,
    page,
    ...props
  }: PropsFromRedux) => {
    const location = useLocation();

    useEffect(() => {
      if (
        !/artwork/.test(location.pathname) &&
        props.projects.length !== 100 * page
      ) {
        const result = /y=([^&]+)(&dimension=((2|3)d))?/.exec(location.search);
        const exploreFromQS = result && result[1];
        const dimensionFromQS = result && result[3] ? result[3] : 'all';
        setExplore(exploreFromQS as Explore);
        setDimension(dimensionFromQS as Dimension);
        updateLocalStorage('explore', exploreFromQS as Explore);
        updateLocalStorage('dimension', dimensionFromQS as Dimension);
      }
    }, [location, setExplore, setDimension, props.projects, page]);

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
          route: /channels/.test(location.pathname)
            ? 'channels'
            : props.explore,
        });
        console.log('NEW URL: ', url);
        getProjects(url);
      }
    }, [
      getProjects,
      props.explore,
      dimension,
      pickedMedias,
      pickedMediums,
      page,
      props.projects.length,
      location.pathname,
    ]);
    return (
      <UnwrappedComponent
        shuffledProjects={
          props.explore === 'community' ? shuffledProjects : undefined
        }
        {...props}
        currentGridSize={
          props.explore === 'community' ? undefined : props.currentGridSize
        }
        location={location}
      />
    );
  };
  return WithMappedStore;
};

export default withMappedStore;
