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
import Project from 'views/Project';
// style
import './App.css';
// newly
import { toggleSignupSigninModal } from 'application/actions/showSignupSigninModal';
import Comments from 'src/views/Project/Comments';
import AddToCollectionModal from 'src/views/Project/AddToCollectionModal';
import FollowButton from 'components/FollowButton';
import type { Following } from '@types';

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
      */}
      {showSignupSigninModal ? <SignupSigninModal /> : null}
      <FollowButton
        user={{ id: 'id', followed: false }}
        successCallback={(following: Following) => console.log(following)}
      />
      <PopUpErrors />
      <Routes>
        <Route path={mosaicPath} element={<Mosaic />} />
      </Routes>
      <Routes>
        <Route path="/artwork/:id" element={<Project />} />
      </Routes>
    </>
  );
};

export default App;
