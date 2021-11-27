// libs
import { Provider } from 'react-redux';
import { Routes, Route, useLocation } from 'react-router-dom';
// store
import store from 'application/store';
// components
import Mosaic from 'views/Mosaic';
import Artwork from 'views/Artwork';
// style
import './App.css';
// newly
import ChannelsDropDownNav from 'views/Mosaic/MosaicFiltersBar/ChannelsNav/ChannelsDropDownNav';

const App = () => {
  const { pathname } = useLocation();
  const mosaicPath = /artwork/.test(pathname) ? '/artwork/:id' : '/';
  return (
    <Provider store={store}>
      {/* <Routes>
        <Route path={mosaicPath} element={<Mosaic />} />
      </Routes>
      <Routes>
        <Route path="/artwork/:id" element={<Artwork />} />
      </Routes> */}
      {/* <JustATest /> */}
      <ChannelsDropDownNav />
    </Provider>
  );
};

export default App;
