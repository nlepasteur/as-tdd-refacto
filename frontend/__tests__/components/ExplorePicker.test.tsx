// libs
import { render } from '@testing-library/react';
// tested components
import { Explores } from 'views/Mosaic/MosaicFiltersBar/ExplorePicker';

describe('ExplorePicker', () => {
  for (const explore of [/community/i, /trending/i, /latest/i, /following/i]) {
    describe('user is logged', () => {
      it(`displays "${explore}"`, () => {
        const { getByText } = render(
          <Explores isLogged handleClick={jest.fn()} />
        );
        expect(getByText(explore)).toBeInTheDocument();
      });
    });
  }

  describe('user is not logged', () => {
    it('does not display "following"', () => {
      const { queryByText } = render(
        <Explores isLogged={false} handleClick={jest.fn()} />
      );
      expect(queryByText('following')).not.toBeInTheDocument();
    });
  });
});
