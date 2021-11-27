// libs
import { render } from '@testing-library/react';
// tested  component
import { DimensionBtns } from 'views/Mosaic/MosaicFiltersBar/DimensionPicker';

describe('DimensionBtns', () => {
  for (const dimension of ['all', '2d', '3d']) {
    it(`displays ${dimension}`, () => {
      const stubInjectedProps = {
        currentDimension: 'all',
        handleDimensionClick: jest.fn(),
      } as const;
      const { getByText } = render(<DimensionBtns {...stubInjectedProps} />);
      expect(getByText(dimension)).toBeInTheDocument();
    });
  }
});
