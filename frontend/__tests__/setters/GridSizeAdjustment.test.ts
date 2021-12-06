// tested setters
import { getUserFavoriteGridSizeHandler } from 'views/Mosaic/MosaicFiltersBar/GridSizeAdjustment/withMappedStore';

describe('GridSizeAdjustment methods', () => {
  describe('getUserFavoriteGridSize', () => {
    describe('user is logged', () => {
      it('calls fetcher', () => {
        const stubArg = { isLogged: true, thunk: jest.fn() };
        getUserFavoriteGridSizeHandler(stubArg);
        expect(stubArg.thunk).toBeCalled();
      });
    });

    describe('user is not logged', () => {
      it('does not call fetcher', () => {
        const stubArg = { isLogged: false, thunk: jest.fn() };
        getUserFavoriteGridSizeHandler(stubArg);
        expect(stubArg.thunk).not.toBeCalled();
      });
    });
  });
});
