// types
import type { ComponentType } from 'react';
import type { ConnectedProps } from 'react-redux';
import type { RootState, GridSize } from 'application/types';
// libs
import { useEffect } from 'react';
import { connect } from 'react-redux';
// action creators
import {
  getUserFavoriteGridSize,
  adjustGridSize,
} from 'application/actions/grid';

const mapState = ({ grid, isLogged }: RootState) => ({
  isLogged,
  currentGridSize: grid,
});

const mapDispatch = (dispatch: any) => ({
  adjustGridSize: (gridSize: GridSize) => dispatch(adjustGridSize(gridSize)),
  getUserFavoriteGridSize: () => dispatch(getUserFavoriteGridSize()),
});

export const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
export type InjectedProps = Omit<
  PropsFromRedux,
  'getUserFavoriteGridSize' | 'isLogged'
>;

export const getUserFavoriteGridSizeHandler = (args: {
  isLogged: PropsFromRedux['isLogged'];
  thunk: PropsFromRedux['getUserFavoriteGridSize'];
}) => {
  if (args.isLogged) {
    args.thunk();
  }
};

const withUserFavoriteGridSize = (
  UnwrappedComponent: ComponentType<InjectedProps>
) => {
  function WithUserFavoriteGridSize({
    isLogged,
    getUserFavoriteGridSize,
    ...props
  }: PropsFromRedux) {
    useEffect(() => {
      getUserFavoriteGridSizeHandler({
        isLogged,
        thunk: getUserFavoriteGridSize,
      });
    }, [isLogged, getUserFavoriteGridSize]);
    return <UnwrappedComponent {...props} />;
  }
  return WithUserFavoriteGridSize;
};

export default withUserFavoriteGridSize;
