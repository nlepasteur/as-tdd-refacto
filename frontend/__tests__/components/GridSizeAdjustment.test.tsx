// types
import { InjectedProps } from 'views/Mosaic/MosaicFiltersBar/GridSizeAdjustment';
// libs
import { render, fireEvent } from '@testing-library/react';
// tested components
import { GridSizeBtns } from 'views/Mosaic/MosaicFiltersBar/GridSizeAdjustment';

describe('GridSizeBtn', () => {
  describe('on click', () => {
    for (const btnGridSize of ['small', 'default', 'large'] as const) {
      it(`calls "handleClick" with "${btnGridSize}" as argument`, () => {
        const stubInjectedProps: InjectedProps = {
          currentGridSize: 'default' as const,
          handleClick: jest.fn(),
        };
        const { getByTestId } = render(<GridSizeBtns {...stubInjectedProps} />);
        fireEvent.click(getByTestId(btnGridSize));
        expect(stubInjectedProps.handleClick).toBeCalledWith(btnGridSize);
      });
    }
  });
  for (const currentGridSize of ['small', 'large'] as const) {
    describe(`current grid size is ${currentGridSize}`, () => {
      it(`${currentGridSize} button is disabled`, () => {
        const stubInjectedProps: InjectedProps = {
          handleClick: jest.fn(),
          currentGridSize,
        };
        const { getByTestId } = render(<GridSizeBtns {...stubInjectedProps} />);
        expect(getByTestId(currentGridSize)).toHaveAttribute('disabled');
      });
    });
  }
  describe('current grid is "default"', () => {
    it('"default" button isn\'t disabled', () => {
      const stubInjectedProps: InjectedProps = {
        handleClick: jest.fn(),
        currentGridSize: 'default' as const,
      };
      const { getByTestId } = render(<GridSizeBtns {...stubInjectedProps} />);
      expect(
        getByTestId(stubInjectedProps.currentGridSize)
      ).not.toHaveAttribute('disabled');
    });
  });
});
