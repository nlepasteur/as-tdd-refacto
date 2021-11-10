// types
import { GridSizeBtnProps } from 'views/Mosaic/MosaicFiltersBar/GridSizeAdjustment/GridSizeBtn';
// libs
import { render, fireEvent } from '@testing-library/react';
// tested components
import GridSizeBtn from 'views/Mosaic/MosaicFiltersBar/GridSizeAdjustment/GridSizeBtn';

describe('GridSizeBtn', () => {
  describe('on click', () => {
    for (const btnGridSize of ['small', 'default', 'large'] as const) {
      it(`calls "handleClick" with "${btnGridSize}" as argument`, () => {
        const stubProps: GridSizeBtnProps = {
          handleClick: jest.fn(),
          currentGridSize: 'default' as const,
          btnGridSize,
          children: {
            title: 'an icon',
          },
        };
        const { getByRole } = render(<GridSizeBtn {...stubProps} />);
        fireEvent.click(getByRole('button'));
        expect(stubProps.handleClick).toBeCalledWith(stubProps.btnGridSize);
      });
    }
  });

  for (const currentGridSize of ['small', 'large'] as const) {
    describe(`current grid size is ${currentGridSize}`, () => {
      it(`${currentGridSize} button is disabled`, () => {
        const stubProps: GridSizeBtnProps = {
          handleClick: jest.fn(),
          currentGridSize,
          btnGridSize: currentGridSize,
          children: {
            title: 'an icon',
          },
        };
        const { getByRole } = render(<GridSizeBtn {...stubProps} />);
        expect(getByRole('button')).toHaveAttribute('disabled');
      });
    });
  }

  describe('current grid is "default"', () => {
    it('"default" button isn\'t disabled', () => {
      const stubProps: GridSizeBtnProps = {
        handleClick: jest.fn(),
        currentGridSize: 'default' as const,
        btnGridSize: 'default' as const,
        children: {
          title: 'an icon',
        },
      };
      const { getByRole } = render(<GridSizeBtn {...stubProps} />);
      expect(getByRole('button')).not.toHaveAttribute('disabled');
    });
  });
});
