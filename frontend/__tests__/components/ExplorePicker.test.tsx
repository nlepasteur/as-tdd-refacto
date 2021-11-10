// types
import { Explore } from 'application/types';
// libs
import { render } from '@testing-library/react';
// tested components
import ExploreBtn from 'views/Mosaic/MosaicFiltersBar/ExplorePicker/ExploreBtn';

describe('Explore', () => {
  for (const [explore, expected] of [
    ['community', /community/i],
    ['trending', /trending/i],
    ['latest', /latest/i],
    ['following', /following/i],
  ]) {
    describe(`explore prop is "${explore}"`, () => {
      it(`displays "${expected}"`, () => {
        const { getByText } = render(
          <ExploreBtn explore={explore as Explore} handleClick={jest.fn()}>
            {{
              title: explore,
            }}
          </ExploreBtn>
        );
        expect(getByText(expected)).toBeInTheDocument();
      });
    });
  }
});
