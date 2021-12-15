// libs
import { Routes, Route, useLocation } from 'react-router-dom';
// store hooks
import { useAppSelector, useAppDispatch } from 'application/hooks';
// selectors
import getShowSignupSigninModal from 'application/selectors/getShowSignupSigninModal';
// components
import SignupSigninModal from 'components/SignupSigninModal';
import PopUpErrors from 'components/PopUpErrors';
import Mosaic from 'views/Mosaic';
import Artwork from 'views/Artwork';
// style
import './App.css';
// newly
import { toggleSignupSigninModal } from 'application/actions/showSignupSigninModal';
import Comments from 'views/Artwork/Comments';
import AddToCollectionModal from 'views/Artwork/AddToCollectionModal';

const App = () => {
  const dispatch = useAppDispatch();
  const showSignupSigninModal = useAppSelector(getShowSignupSigninModal);
  const { pathname } = useLocation();
  const mosaicPath = /artwork/.test(pathname) ? '/artwork/:id' : '/';

  return (
    <>
      {/* <button
        onClick={() => dispatch(toggleSignupSigninModal())}
        style={{
          color: 'white',
        }}
      >
        toggle signup signin modal
      </button>
      {showSignupSigninModal ? <SignupSigninModal /> : null} */}

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
