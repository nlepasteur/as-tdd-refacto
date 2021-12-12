// types
import type { ComponentType } from 'react';
import type { InjectedProps as PropsFromWithSetters } from './withSetters';
// libs
import { useContext } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
// components
import withProject, { connector } from './withProject';
import withSetters from './withSetters';
import { ProjectContext, toggleLikesModal } from './ProjectContextProvider';
import LikesModal from './LikesModal';
import StopScrollOnArtworkPageOverlayAntagonist from 'components/StopScrollOnArtworkPageOverlayAntagonist';

export type InjectedProps = PropsFromWithSetters;

const Artwork: ComponentType<InjectedProps> = ({
  data: project,
  isLogged,
  addPopUpError,
  toggleSignupSigninModal,
  like,
}) => {
  const { dispatch, showLikesModal } = useContext(ProjectContext);
  console.log('dispatch: ', dispatch, 'showLikesModal: ', showLikesModal);
  const { state } = useLocation();
  const { id } = useParams();
  // const toggleLikesModal = () => {
  //   dispatch({ type: 'TOGGLE_LIKES_MODAL' });
  // };

  return (
    <StopScrollOnArtworkPageOverlayAntagonist>
      <div>
        {showLikesModal ? (
          <LikesModal
            votable_id={id as string}
            toggleLikesModal={() => dispatch({ type: 'TOGGLE_LIKES_MODAL' })}
          />
        ) : null}
        <button
          onClick={() => dispatch({ type: 'TOGGLE_LIKES_MODAL' })}
          style={{ color: 'white' }}
        >
          toggle
        </button>
        <Link to={state ? state.from : '/some/user'}>leave artwork {id}</Link>
      </div>
    </StopScrollOnArtworkPageOverlayAntagonist>
  );
};

export default connector(withProject(withSetters(Artwork)));
