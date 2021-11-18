// libs
import { Provider } from 'react-redux';
// store
import store from 'application/store';
// newly developed component
import GridSizeAdjustment from 'views/Mosaic/MosaicFiltersBar/GridSizeAdjustment';
import withSpecificExplore from 'views/Mosaic/Projects/withSpecificExplore';
import ExplorePicker from 'views/Mosaic/MosaicFiltersBar/ExplorePicker';
import DimensionPicker from 'views/Mosaic/MosaicFiltersBar/DimensionPicker';
import MediasMediumsDropDownPicker from 'views/Mosaic/MosaicFiltersBar/MediasMediumsDropDownPicker';
import ProjectsWithInfiniteScroll from 'views/Mosaic/Projects/ProjectsWithInfiniteScroll';
import ProjectsWithoutInfiniteScroll from 'views/Mosaic/Projects/ProjectsWithoutInfiniteScroll';

const Wrapped = (
  props: Partial<{
    isExplore: true;
    community: true;
    trending: true;
    latest: true;
    following: true;
    isChannel: true;
  }>
) => <div>yo</div>;

const App = () => {
  return (
    <Provider store={store}>
      {/* <GridSizeAdjustment /> */}
      <ExplorePicker />
      {/* <DimensionPicker /> */}
      {/* <MediasMediumsDropDownPicker /> */}
      {/* <ProjectsWithInfiniteScroll /> */}
      <ProjectsWithoutInfiniteScroll />
    </Provider>
  );
};

export default App;
