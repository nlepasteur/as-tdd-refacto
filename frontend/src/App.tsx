// libs
import { Provider } from 'react-redux';
// store
import store from 'application/store';
// newly developed component
import GridSizeAdjustment from 'views/Mosaic/MosaicFiltersBar/GridSizeAdjustment';
import withSpecificExplore from 'views/Mosaic/Projects/withSpecificExplore';
import ExplorePicker from 'views/Mosaic/MosaicFiltersBar/ExplorePicker';

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

const SpecificExplore = withSpecificExplore(Wrapped);

const App = () => {
  return (
    <Provider store={store}>
      <GridSizeAdjustment />
      <ExplorePicker />
      {/* <SpecificExplore isExplore trending /> */}
    </Provider>
  );
};

export default App;
