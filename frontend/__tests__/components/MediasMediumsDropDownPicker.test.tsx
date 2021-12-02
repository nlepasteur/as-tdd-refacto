// types
import { InjectedProps as MediaBtnProps } from 'views/Mosaic/MosaicFiltersBar/MediasMediumsDropDownPicker/Menu/MediasBtns/MediaBtn';
import { InjectedProps as MediumBtnProps } from 'views/Mosaic/MosaicFiltersBar/MediasMediumsDropDownPicker/Menu/MediumsBtns/MediumBtn';
// libs
import { render, fireEvent } from '@testing-library/react';
// tested components
import MediaBtn from 'views/Mosaic/MosaicFiltersBar/MediasMediumsDropDownPicker/Menu/MediasBtns/MediaBtn';
import MediumBtn from 'views/Mosaic/MosaicFiltersBar/MediasMediumsDropDownPicker/Menu/MediumsBtns/MediumBtn';

describe('MediasMediumsDropDownPicker', () => {
  describe('Menu', () => {
    describe('MediaBtn', () => {
      const stubInjectedBaseProps: MediaBtnProps = {
        isPicked: true,
        pickMedia: jest.fn(),
        media: {
          name: 'media name',
          as_query: 'media_name',
        },
      };

      it("displays media's name", () => {
        const { getByText } = render(<MediaBtn {...stubInjectedBaseProps} />);
        expect(getByText(/media name/i)).toBeInTheDocument();
      });

      it('calls pickMedia with media "as_query" property', () => {
        const { getByRole } = render(<MediaBtn {...stubInjectedBaseProps} />);
        fireEvent.click(getByRole('checkbox'));
        expect(stubInjectedBaseProps.pickMedia).toBeCalledWith(
          stubInjectedBaseProps.media.as_query
        );
      });

      describe('media is picked', () => {
        it('is checked', () => {
          const { getByRole } = render(<MediaBtn {...stubInjectedBaseProps} />);
          expect(getByRole('checkbox')).toHaveAttribute('checked');
        });
      });

      describe('media is not picked', () => {
        it('is not checked', () => {
          const { getByRole } = render(
            <MediaBtn {...stubInjectedBaseProps} isPicked={false} />
          );
          expect(getByRole('checkbox')).not.toHaveAttribute('checked');
        });
      });
    });

    describe('MediumBtn', () => {
      const stubInjectedBaseProps: MediumBtnProps = {
        isPicked: true,
        pickMedium: jest.fn(),
        medium: {
          name: 'medium name',
          id: 'id',
          uri: '',
        },
      };

      it("displays media's name", () => {
        const { getByText } = render(<MediumBtn {...stubInjectedBaseProps} />);
        expect(getByText(/medium name/i)).toBeInTheDocument();
      });

      it('calls pickMedia with media "as_query" property', () => {
        const { getByRole } = render(<MediumBtn {...stubInjectedBaseProps} />);
        fireEvent.click(getByRole('checkbox'));
        expect(stubInjectedBaseProps.pickMedium).toBeCalledWith(
          stubInjectedBaseProps.medium.id
        );
      });

      describe('media is picked', () => {
        it('is checked', () => {
          const { getByRole } = render(
            <MediumBtn {...stubInjectedBaseProps} />
          );
          expect(getByRole('checkbox')).toHaveAttribute('checked');
        });
      });

      describe('media is not picked', () => {
        it('is not checked', () => {
          const { getByRole } = render(
            <MediumBtn {...stubInjectedBaseProps} isPicked={false} />
          );
          expect(getByRole('checkbox')).not.toHaveAttribute('checked');
        });
      });
    });
  });
});
