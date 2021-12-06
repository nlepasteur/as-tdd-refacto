// libs
import { Routes, Route, useLocation } from 'react-router-dom';
// components
import PopUpErrors from 'components/PopUpErrors';
import Mosaic from 'views/Mosaic';
import Artwork from 'views/Artwork';
// style
import './App.css';
// newly

const App = () => {
  const { pathname } = useLocation();
  const mosaicPath = /artwork/.test(pathname) ? '/artwork/:id' : '/';

  return (
    <>
      <PopUpErrors />
      <Routes>
        <Route path={mosaicPath} element={<Mosaic />} />
      </Routes>
      <Routes>
        <Route path="/artwork/:id" element={<Artwork />} />
      </Routes>
    </>
  );
};

export default App;
