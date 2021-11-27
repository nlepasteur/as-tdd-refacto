// types
import type { ReactNode, ComponentType } from 'react';
// store hooks
import { useAppSelector } from 'application/hooks';
// selectors
import { getCurrentExplore } from 'application/selectors/explore';
// components
import ExplorePicker from './ExplorePicker';
import DimensionPicker from './DimensionPicker';
import GridSizeAdjustment from './GridSizeAdjustment';
import MediasMediumsDropDownPicker from './MediasMediumsDropDownPicker';
// style
import './MosaicFiltersBar.css';

type MosaicFiltersBarGridProps = {
  children: {
    channelsCarouselNav: ReactNode;
    channelsDropDownNav: ReactNode;
    explorePicker: ReactNode;
    dimensionPicker: ReactNode;
    gridSizeAdjustment: ReactNode;
    mediasMediumsDropDownPicker: ReactNode;
  };
};

const MosaicFiltersBarGrid: ComponentType<MosaicFiltersBarGridProps> = ({
  children: {
    channelsCarouselNav,
    channelsDropDownNav,
    explorePicker,
    dimensionPicker,
    gridSizeAdjustment,
    mediasMediumsDropDownPicker,
  },
}) => {
  const currentExplore = useAppSelector(getCurrentExplore);
  return (
    <div className="mosaic-filters-bar">
      <div style={{ gridArea: 'channelsCarouselNav' }}>
        {channelsCarouselNav}
      </div>
      <div style={{ gridArea: 'channelsDropDownNav' }}>
        {channelsDropDownNav}
      </div>
      <div style={{ gridArea: 'explorePicker' }}>{explorePicker}</div>
      <div style={{ gridArea: 'dimensionPicker' }}>{dimensionPicker}</div>
      {currentExplore !== 'community' ? (
        <div style={{ gridArea: 'gridSizeAdjustment' }}>
          {gridSizeAdjustment}
        </div>
      ) : null}
      <div style={{ gridArea: 'mediasMediumsDropDownPicker' }}>
        {mediasMediumsDropDownPicker}
      </div>
    </div>
  );
};

const MosaicFiltersBar = () => (
  <MosaicFiltersBarGrid>
    {{
      channelsCarouselNav: <div>channels carousel nav</div>,
      channelsDropDownNav: <div>channels drop down nav</div>,
      explorePicker: <ExplorePicker />,
      dimensionPicker: <DimensionPicker mosaicFiltersBar />,
      gridSizeAdjustment: <GridSizeAdjustment />,
      mediasMediumsDropDownPicker: <MediasMediumsDropDownPicker />,
    }}
  </MosaicFiltersBarGrid>
);

export default MosaicFiltersBar;
